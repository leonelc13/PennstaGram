const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/DB');
const { resetUserLockUntil, getUserFromDb } = require('../model/Login-RegisterDBOperations');

require('dotenv').config();

beforeAll(async () => {
  await connect(process.env.DATABASE_URL);
});

afterAll(async () => {
  try {
    await resetUserLockUntil('testUser');
    await closeServer();
  } catch (err) {
    return err;
  }
});

describe('POST /login', () => {
  test('returns 401 if both name and password are missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({});

    expect(response.status).toBe(401);
  });

  test('returns 401 if name is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({ password: 'password' });

    expect(response.status).toBe(401);
  });

  test('returns 401 if password is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({ name: 'username' });

    expect(response.status).toBe(401);
  });

  test('empty username and password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ name: '', password: '' });
    expect(response.status).toBe(401);
  });

  test('returns 401 if user does not exist', async () => {
    const response = await request(app)
      .post('/login')
      .send({ name: 'nonexistentuser', password: 'password' });

    expect(response.status).toBe(401);
  });

  test('returns 401 if password does not match', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ name: 'testUser', password: 'Contreras23' });

    expect(loginResponse.status).toBe(401);
  });

  test('returns a token if login is successful', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ name: 'testUser', password: 'testPass' });

    expect(loginResponse.status).toBe(201);
    expect(loginResponse.body).toHaveProperty('apptoken');
  });

  test('username with spaces', async () => {
    const response = await request(app)
      .post('/login')
      .send({ name: '  testUser  ', password: 'testPass' });
    expect(response.status).toBe(401);
  });
});

const simulateFailedLogins = async (username, password, times) => {
  for (let attempt = 1; attempt < times; attempt++) {
    await request(app)
      .post('/login')
      .send({ name: username, password });
  }
};

describe('POST /login lockout tests', () => {
  const username = 'testUser';
  const wrongPassword = 'wrongPass';

  test('returns warning message after first failed login attempt', async () => {
    await simulateFailedLogins(username, wrongPassword, 1);

    const response = await request(app)
      .post('/login')
      .send({ name: username, password: wrongPassword });

    expect(response.status).toBe(401);
    expect(response.body.error).toMatch(/Incorrect password. You have 2 attempt\(s\) left before being locked out./);
  });

  test('locks account after third failed login attempt', async () => {
    await simulateFailedLogins(username, wrongPassword, 2);

    const response = await request(app)
      .post('/login')
      .send({ name: username, password: wrongPassword });

    expect(response.status).toBe(401);
    expect(response.body.error).toMatch(/Account is locked for 2 minutes/);
  });

  test('shows remaining lockout time after fourth failed attempt', async () => {
    await simulateFailedLogins(username, wrongPassword, 1);

    const response = await request(app)
      .post('/login')
      .send({ name: username, password: wrongPassword });

    expect(response.status).toBe(401);
    expect(response.body.error).toMatch(/Try again in/);
  });
});

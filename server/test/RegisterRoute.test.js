const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/DB');

require('dotenv').config();


const deleteTestDataFromDB = async (db, testData) => {
  try {
    const result = await db.collection('User').deleteMany({ username: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test user');
    } else {
      console.log('warning', 'test user was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
}

beforeAll(async () => {
  await connect(process.env.DATABASE_URL);
});

afterAll(async () => {
  const db = getDb();
  try {
    await deleteTestDataFromDB(db, '@testuser');
    await deleteTestDataFromDB(db, '@newuser');
    await closeServer();
  } catch (err) {
    return err;
  }
});

describe('POST /register', () => {
  test('returns 401 if both name and password are missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({});

    expect(response.status).toBe(401);
  });

  test('returns 401 if name is missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({ password: 'password' });

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ error: 'Missing username' });
  });

  test('returns 401 if password is missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: '@username' });

    expect(response.status).toBe(401);
  });

  describe('POST /register validation tests', () => {
    const userWithShortName = { name: '@a', password: 'pass#124' };
    const userWithLongName = { name: '@averylongusername', password: 'pass#124' };
    const userWithLetterStartName = { name: 'testUser', password: 'pass#124' };
    const userWithShortPassword = { name: '@testuser', password: 'p#1' };
    const userWithLongPassword = { name: '@testuser', password: 'passwordtoolong#1' };
    const userWithInvalidPassword = { name: '@testuser', password: 'password' };
  
    test('returns 400 if username is too short', async () => {
      const response = await request(app)
        .post('/register')
        .send(userWithShortName);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Username must be between 5 and 10 characters/);
    });
  
    test('returns 400 if username is too long', async () => {
      const response = await request(app)
        .post('/register')
        .send(userWithLongName);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Username must be between 5 and 10 characters/);
    });
  
    test('returns 400 if username starts with a letter', async () => {
      const response = await request(app)
        .post('/register')
        .send(userWithLetterStartName);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Username cannot start with a letter/);
    });
  
    test('returns 400 if password is too short', async () => {
      const response = await request(app)
        .post('/register')
        .send(userWithShortPassword);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Password must be between 5 and 10 characters/);
    });
  
    test('returns 400 if password is too long', async () => {
      const response = await request(app)
        .post('/register')
        .send(userWithLongPassword);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Password must be between 5 and 10 characters/);
    });
  
    test('returns 400 if password does not contain a special character or number', async () => {
      const response = await request(app)
        .post('/register')
        .send(userWithInvalidPassword);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Password must contain at least one special character or number/);
    });
  });

  test('returns 401 if user already exists', async () => {
    await request(app)
      .post('/register')
      .send({ name: '@testuser', password: 'pass124' });

    const response = await request(app)
      .post('/register')
      .send({ name: '@testuser', password: 'pass124' });

    expect(response.status).toBe(401);
  });

  test('returns 201 and a token if registration is successful', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: '@newuser', password: 'hello2' });

    expect(response.status).toBe(201);
  });
});
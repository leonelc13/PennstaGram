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
      console.log('warning', `test user '${testData}' was not deleted`);
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
    await deleteTestDataFromDB(db, 'testuser');
    await deleteTestDataFromDB(db, 'newuser');
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
});

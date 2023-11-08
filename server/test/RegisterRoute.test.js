const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/db');

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
    await deleteTestDataFromDB(db, 'testuser');
    await deleteTestDataFromDB(db, 'newuser');
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
      .send({ name: 'username' });

    expect(response.status).toBe(401);
  });

  test('returns 401 if user already exists', async () => {
    await request(app)
      .post('/register')
      .send({ name: 'testuser', password: 'password' });

    const response = await request(app)
      .post('/register')
      .send({ name: 'testuser', password: 'password' });

    expect(response.status).toBe(401);
  });

  test('returns 201 and a token if registration is successful', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'newuser', password: 'password' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('apptoken');
  });
});
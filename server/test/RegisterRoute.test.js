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
    await deleteTestDataFromDB(db, '@newuser2');
    await closeServer();
  } catch (err) {
    return err;
  }
});

describe('POST /register', () => {
  test('returns 401 when username is null', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: null, password: 'password' });
  
    expect(response.status).toBe(401);
  });
  
  test('returns 401 when password is null', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'username', password: null });
  
    expect(response.status).toBe(401);
  });
  
  test('returns 401 when both username and password are null', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: null, password: null });
  
    expect(response.status).toBe(401);
  });
  
  test('does not create user with null username and password', async () => {
    await request(app)
      .post('/register')
      .send({ name: null, password: null });
  
    const db = getDb();
    const user = await db.collection('User').findOne({ username: null });
  
    expect(user).toBeNull();
  });

  test('no whitespace allowed', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: '  @newuser  ', password: '  hello2  ' });

    expect(response.status).toBe(400);
    // Verify that the username in the database does not contain the whitespace
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

  test('creates user with correct data fields initialized', async () => {
    await request(app)
      .post('/register')
      .send({ name: '@newuser2', password: 'hello3' });

    const db = getDb();
    const user = await db.collection('User').findOne({ username: '@newuser2' });
    expect(Array.isArray(user.followers)).toBe(true);
    expect(Array.isArray(user.following)).toBe(true);
    expect(user.failedLoginAttempts).toBe(0);
    // And so on for other fields...
  });
});

describe('POST /register validation tests', () => {
    const userWithShortName = { name: '@a', password: 'pass#124' };
    const userWithLongName = { name: '@averylongusername', password: 'pass#124' };
    const userWithLetterStartName = { name: 'testUse3', password: 'pass#124' };
    const userWithShortPassword = { name: '@testuse3', password: 'p#1' };
    const userWithLongPassword = { name: '@testuse3', password: 'passwordtoolong#1' };
    const userWithInvalidPassword = { name: '@testuse3', password: 'password' };
  
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
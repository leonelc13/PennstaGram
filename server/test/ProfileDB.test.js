const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/DB');
const { registerUser } = require('../model/Login-RegisterDBOperations');

require('dotenv').config();

const deleteTestDataFromDB = async (db, testData) => {
    try {
      const result = await db.collection('User').deleteOne({ username: testData });
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
      await deleteTestDataFromDB(db, 'testAdmin1');
      await deleteTestDataFromDB(db, 'testAdmin2');
      await closeServer();
    } catch (err) {
      return err;
    }
});

const testAdmin1 = {
    "username": "testAdmin1",
    "password": "testAdmin1",
    "profile": "https://i.ibb.co/60NBw0q/tiger.jpg",
    "followers": [],
    "following": []
}

const testAdmin2 = {
    "username": "testAdmin2",
    "password": "testAdmin2",
    "profile": "https://i.ibb.co/60NBw0q/tiger.jpg",
    "followers": [],
    "following": []
}

describe('Test Profile Info', () => {
    
    test('Get user profile', async () => {
        await registerUser(testAdmin1);
        const res = await request(app).get(`/users/testAdmin1`);
        // console.log('res',res);
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toEqual(testAdmin1.username);
    });

    test('Get user profile with invalid username', async () => {
        const res = await request(app).get(`/users/invalidUsername`);
        expect(res.statusCode).toBe(404);
    });

    test('update user profile', async () => {
        await registerUser(testAdmin1);
        const res = await request(app).put(`/users/${testAdmin1._id}`).send({profile: "https://imageio.forbes.com/specials-images/imageserve/602c09c9135a060af5e1a8f4/Face-with-Spiral-Eyes---a-new-Apple-emoji-/960x0.png?format=png&width=960"});
        return expect(res.statusCode).toBe(200);
    });

});

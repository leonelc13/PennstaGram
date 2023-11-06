const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/DB');
const { registerUser } = require('../model/Login-RegisterDBOperations');

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
      await deleteTestDataFromDB(db, 'testAdmin');
      await closeServer();
    } catch (err) {
      return err;
    }
});

const testAdmin = {
    "username": "testAdmin",
    "password": "testAdmin",
    "profile": "https://i.ibb.co/60NBw0q/tiger.jpg",
    "followers": [],
    "following": []
}

describe('Test Profile Info', () => {
    
    test('Get user profile', async () => {
        await registerUser(testAdmin);
        const res = await request(app)
            .get('/users/testAdmin')
            .expect(200);

        expect(res.body.username).toEqual('testAdmin');
    });

    //this is not passing... very wired?
    test('Get user profile with invalid username', async () => {
        const res = await request(app)
            .get('/users/invalidUsername')
        
        console.log(res.body);
        expect(res.status).toEqual(404);

        expect(res.body.error).toEqual('User does not exist');
    });


});

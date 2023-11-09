/* eslint-disable */
const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/DB');
const postDB = require('../model/PostDB');
require('dotenv').config();

let db;

const testPosts = {
    "content": "This is a test post",
    "url": "https://i.ibb.co/60NBw0q/tiger.jpg",
    "user": "testAdmin",
    "likes": 0,
    "comments": [],
    "isImage": true,
    "created": "2020-11-30T04:38:39.000Z"
}

const deleteTestDataFromDB = async (db, testData) => {
    try {
      const result = await db.collection('Posts').deleteMany({ user: testData });
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

describe ('Activity Feed Tests', () => {

    test('test creating a post', async () => {
        await postDB.createPost(testPosts);
        // find new post in the DB
        // console.log("test post id", testPosts._id);
        const insertedPost = await postDB.getPostById(testPosts._id);
        expect(insertedPost.content).toEqual('This is a test post');

    });  

    test('get post returns the post', async () => {
        const response = await request(app).get(`/posts`);
        expect(response.statusCode).toBe(200);
    });

    test('get post invalid id', async () => {
        const response = await request(app).get(`/posts/123`);
        expect(response.statusCode).toBe(404);
    });

    test('get post by id', async () => {
        const response = await request(app).get(`/posts/${testPosts._id}`);
        expect(response.statusCode).toBe(200);
    });

    test ('create post returns the post', async () => {
        const response = await request(app).post(`/posts`).send(testPosts);
        expect(response.statusCode).toBe(201);
    });

    test('create post invalid post', async () => {
        const response = await request(app).post(`/posts`).send({});
        expect(response.statusCode).toBe(401);
    });

    test('delete post', async () => {
        const response = await request(app).delete(`/posts/${testPosts._id}`);
        expect(response.statusCode).toBe(200);
    });

    test('delete invalid post', async () => {
        const response = await request(app).delete(`/posts/123`);
        expect(response.statusCode).toBe(404);
    });

    test('update post', async () => {
        const response = await request(app).put(`/posts/${testPosts._id}`).send(testPosts);
        expect(response.statusCode).toBe(200);
    });

    test('update invalid post', async () => {
        const response = await request(app).put(`/posts/123`).send(testPosts);
        expect(response.statusCode).toBe(404);
    });

});

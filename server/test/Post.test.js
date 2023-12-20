/* eslint-disable */
const request = require('supertest');
const { app, closeServer } = require('../index');
const { connect, getDb } = require('../model/DB');
const postDB = require('../model/PostDB');
const { verifyUser } = require('../utils/auth');
require('dotenv').config();
require('formidable');

const { deletePostRoute } = require('../routes/PostRoute');
const { deletePost } = postDB.deletePost;

const { createPostRoute } = require('../routes/PostRoute');

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

// Mock dependencies
// jest.mock('../utils/auth', () => ({
//   verifyUser: jest.fn(),
// }));
jest.mock('../utils/auth', () => ({
  verifyUser: jest.fn(() => Promise.resolve(true)), // Change this as needed
}));

app.post('/createPost', createPostRoute);


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
  // await connect(process.env.DATABASE_URL);
  await connect(process.env.DATABASE_URL, (err, database) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      // Do any setup that requires the database connection here
    }
  });
});

afterAll(async () => {
  const db = getDb();
  try {
    await deleteTestDataFromDB(db, 'exampleUser');
    await deleteTestDataFromDB(db, 'testAdmin');
    await closeServer();
  } catch (err) {
    console.error('Error during cleanup:', err);
    process.exit(1); // Exit with an error code to indicate failure
  }
});

describe('createPostRoute', () => {
  it('should create a new post', async () => {
    verifyUser.mockImplementation(() => Promise.resolve(true)); // Change this as needed

    const postPayload = {
      user: 'exampleUser',
      content: 'This is a test post',
      isImage: true,
      url: 'https://example.com/image.jpg',
    };

    // Use supertest to send a request to your endpoint
    const response = await request(app)
      .post('/createPost')
      .set('Authorization', 'Bearer yourAccessToken') // Replace with a valid access token
      .send(testPosts);

    // Assertions based on your implementation
    expect(response.status).toBe(201);
    // Add more assertions as needed
  });

    test('get post returns the post', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true)); // Change this as needed
        const response = await request(app).get(`/posts`);
        expect(response.statusCode).toBe(200);
    });

    test('get post invalid id', async () => {
        const response = await request(app).get(`/posts/123`);
        expect(response.statusCode).toBe(404);
    });

    test('get post by id', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true));
      await postDB.createPost(testPosts);
      const response = await request(app).get(`/posts/${testPosts._id}`);
      expect(response.statusCode).toBe(200);
    });

    test ('create post returns the post', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true));
        const response = await request(app).post(`/posts`).send(testPosts);
        expect(response.statusCode).toBe(201);
    });

    test('create post invalid post', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true));
        const response = await request(app).post(`/posts`).send({});
        expect(response.statusCode).toBe(401);
    });

    test('delete invalid post', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true));
        const response = await request(app).delete(`/posts/123`);
        expect(response.statusCode).toBe(404);
    });

    test('update post', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true));
        const response = await request(app).put(`/posts/${testPosts._id}`).send(testPosts);
        expect(response.statusCode).toBe(200);
    });

    test('update invalid post', async () => {
      verifyUser.mockImplementation(() => Promise.resolve(true));
        const response = await request(app).put(`/posts/123`).send(testPosts);
        expect(response.statusCode).toBe(404);
    });

});


describe('Post Route Additional Tests', () => {

  test('cannot delete a post by unauthorized user', async () => {
    verifyUser.mockResolvedValue(false);
    const response = await request(app).delete(`/posts/${testPosts._id}`);
    expect(response.statusCode).toBe(401);
  });

  test('retrieve all post IDs', async () => {
    verifyUser.mockImplementation(() => Promise.resolve(true));
    const response = await request(app).get(`/postIds`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('test get post by user', async ()=> {
    verifyUser.mockImplementation(() => Promise.resolve(true));
    const response = await request(app).get(`/posts/byUser/${testPosts.user}`);
    expect(response.statusCode).toBe(200);
  });
});

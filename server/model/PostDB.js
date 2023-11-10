const { getDb } = require('./DB');

const getAllPosts = async () => {
  const db = getDb();
  try {
    const res = await db.collection('Posts').find().toArray();
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error('Error finding all posts.');
  }
};

const getPostById = async (id) => {
  const db = getDb();
  try {
    const res = await db.collection('Posts').findOne({ _id: id });
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error(`Error finding post ${id}.`);
  }
};

const deletePost = async (id) => {
  const db = getDb();
  try {
    const res = await db.collection('Posts').deleteOne({ _id: id });
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error(`Error deleting post ${id}.`);
  }
};

const createPost = async (post) => {
  const db = getDb();
  // check if the post has all the required fields
  try {
    const res = await db.collection('Posts').insertOne(post);
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error('Error adding post.');
  }
};

const updatePost = async (id, post) => {
  const db = getDb();
  try {
    const res = await db.collection('Posts').findOneAndUpdate({ _id: id }, { $set: post }, { returnNewDocument: true, returnDocument: 'after' });
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error(`Error updating post ${id}.`);
  }
};

  

module.exports = {
  getAllPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  // getPostsByUser,
  // addCommentToPost
};

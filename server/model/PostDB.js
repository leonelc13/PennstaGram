const { getDb } = require('./DB');
const { ObjectId } = require('mongodb');

const getAllPosts = async (page, limit) => {
  const db = getDb();
  try {
    const res = await db.collection('Posts')
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    return res;
  } catch (err) {
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

const getPostsByUser = async (username) => {
  const db = getDb();
  try {
    const res = await db.collection('Posts').find({ user: username }).toArray();
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error(`Error finding posts by user ${username}.`);
  }
};

const getHiddenPostByUser = async (user) => {
  const db = getDb();
  try {
    const idList = user.hiddenPosts;
    const objectIdList = idList.map((idString) => new ObjectId(idString));
    const res = await db.collection('Posts').find({ _id: { $in: objectIdList } }).toArray();
    return res;
  } catch (err) {
    // console.error(err);
    throw new Error('Error finding hidden posts by user.');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getPostsByUser,
  getHiddenPostByUser,
  // addCommentToPost
};

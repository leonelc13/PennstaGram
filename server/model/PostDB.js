const { ObjectId } = require('mongodb');
const { getDb } = require('./DB');

const getAllPosts = async (page, limit) => {
  const db = getDb();
  try {
    const res = await db.collection('Posts')
      .find()
      .sort({ created: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    return res;
  } catch (err) {
    throw new Error('Error finding all posts.');
  }
};

const getAllPostIds = async () => {
  const db = getDb();
  try {
    const res = await db.collection('Posts').find({}, { projection: { _id: 1 } }).toArray();
    return res;
  } catch (err) {
    throw new Error('Error finding all post ids.');
  }
};

const getFeed = async (user, page, limit) => {
  const db = getDb();
  try {
    // get the list of following first

    const followingList = user.following;
    followingList.push(user.username);

    const res = await db.collection('Posts')
      .find({ user: { $in: followingList } })
      .sort({ created: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // console.log(res);
    return res;
  } catch (err) {
    throw new Error('Error fetching activity feed.');
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
    const res = await db.collection('Posts').find({ user: username }).sort({ created: -1 }).toArray();
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
  getFeed,
  getAllPostIds,
  // addCommentToPost
};

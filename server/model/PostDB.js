const { getDb } = require('./DB');

const getAllPosts = async () => {
    const db = getDb();
    try {
        const res = await db.collection('Posts').find().toArray();
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding all posts.`);
    }
}

const getPostById = async (id) => {
    const db = getDb();
    try {
        const res = await db.collection('Posts').findOne({ _id: id });
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding post ${id}.`);
    }
}

const getPostsByUser = async (username) => {
    const db = getDb();
    try {
        const res = await db.collection('Posts').find({ username: username }).toArray();
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding posts for user ${username}.`);
    }
}

const deletePost = async (id) => {
    const db = getDb();
    try {
        const res = await db.collection('Posts').deleteOne({ _id: id });
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error deleting post ${id}.`);
    }
}

// const addCommentToPost = async (id, existingComments, newComment) => {
//     const db = getDb();
//     try {
//         existingComments.push(newComment);
//         const res = await db.collection('Posts').updateOne({ _id: id }, { $set: { comments: existingComments } });
//         return res;
//     } catch (err) {
//         console.error(err);
//         throw new Error(`Error adding comment to post ${id}.`);
//     }
// }

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByUser,
    deletePost,
    // addCommentToPost
}
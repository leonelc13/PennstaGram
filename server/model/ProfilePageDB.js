const { getDb } = require('./DB');

const getUserById = async (name) => {
    const db = getDb();
    try {
        const res = await db.collection('User').findOne({ username: name });
        // console.log(`User: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding profile for user ${name}.`);
    }
}

const updateUser = async (userid, body) => {
    const db = getDb();
    try {
        const res = await db.collection('User').updateOne({_id: userid}, {$set: body},{ returnNewDocument: true, returnDocument: 'after'});
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error updating user ${userid}.`);
    }
}

const getAllUsers = async () => {
    const db = getDb();
    try {
        const res = await db.collection('User').find({}).toArray();
        // console.log(`User: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding all profiles.`);
    }
}



module.exports = {
    getUserById,
    updateUser,
    getAllUsers
    // followUser,
    // unfollowUser
}
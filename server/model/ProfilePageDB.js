const database = require('./DB');

const getProfileByUsername = async (name) => {
    try {
        console.log(name);
        let db = await database.getDb();
        const res = await db.collection('User').findOne({ username: name });
        console.log(`User: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding profile for user ${name}.`);
    }
}

const getAllQuizzes = async () => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Quiz')
        .find()
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}

const getCreatedQuizzes = async (name) => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Quiz')
        .find({ author_name: name })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}

const getFavoriteQuizzes = async (name) => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Quiz')
        .find({ upvotes: { $in: [name] } })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}
  


const profilePageDB = {
    getProfileByUsername: getProfileByUsername,
    getAllQuizzes: getAllQuizzes,
    getCreatedQuizzes: getCreatedQuizzes,
    getFavoriteQuizzes: getFavoriteQuizzes
}

module.exports = profilePageDB;
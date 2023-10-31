const { getDb } = require('./DB');


const getUser = async(name) => {
    const db = getDb();
    try {
        const result = await db.collection('User').findOne({username: name});
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
};

const registerUser = async (newUser) => {
    const db = getDb();
    try {
        const result = await db.collection('User').insertOne(newUser);
        return result;

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getUser,
    registerUser
}
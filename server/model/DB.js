const { MongoClient } = require('mongodb');

let db;

const connect = async (url, callback) => {
    try {
        const conn = (await MongoClient.connect(url, {
            useNewUrlParser: true, useUnifiedTopology: true,
        }));
        db = conn.db("PennConnect");
        console.log(`Connected to database: ${db.databaseName}`);
        return callback(null, conn);
    } catch (err) {
        console.log(err);
    }
};

const init = async () => {
    // ADD COLLECTION NAMES
    const collectionNames = ["User"];
    collectionNames.forEach(async (collectionName, i) => {
        const exists = await db.listCollections({ name: collectionName }).hasNext();
        if (!exists) {
            console.log(`Creating database with name ${collectionName}`);
            await db.createCollection(collectionName);
        }
    })
};

function getDb() {
    return db;
}

module.exports = {
    init,
    connect,
    getDb
}
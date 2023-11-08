/**
 * 
 *    PENN BUZZ SERVER
 *  
 **/

const SERVER_PORT = 3000;
const app = require('./server');
//const socketServer = require('./socketServer');
require('dotenv').config();
const db = require('./model/DB');
const { databaseUrl } = require('./utils/utils');
 
 
//const searchTrie = require('./SearchTrie');



console.log("Attempting to connect to MongoDB ");
db.connect(databaseUrl, async (err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }

    console.log("Successfully connected to MongoDB");
});


const server = app.listen(SERVER_PORT, async () => {
    console.log('Server running on port', SERVER_PORT);
    await db.connect(databaseUrl, async (err) => {
        if (err) {
            console.error('Failed to connect to MongoDB:', err);
            process.exit(1);
        }
        await db.init().then(() => {
            console.log("Successfully initialized MongoDB");
        });

        //await searchTrie.populate();
    });
});

// Shuts down both servers
const closeServer = async () => {
    await server.close();
    //await socketServer.close();
};

module.exports = { app, closeServer };

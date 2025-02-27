/* eslint-disable no-console */
/* disable eslint */
/**
 *
 *    PENN BUZZ SERVER
 *
 * */

const PORT = process.env.PORT || 3000;
const app = require('./server');
// const socketServer = require('./socketServer');
require('dotenv').config();
const db = require('./model/DB');

// const searchTrie = require('./SearchTrie');

console.log('Attempting to connect to MongoDB ');
db.connect(process.env.DATABASE_URL, async (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }

  console.log('Successfully connected to MongoDB');
});

const server = app.listen(PORT, async () => {
  console.log('Server running on port', PORT);
  await db.connect(process.env.DATABASE_URL, async (err) => {
    if (err) {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    }
    await db.init().then(() => {
      console.log('Successfully initialized MongoDB');
    });

    // await searchTrie.populate();
  });
});

// Shuts down both servers
// const closeServer = async () => {
//   await server.close();
//   // await socketServer.close();
// };
// Shuts down both servers
const closeServer = async () => new Promise((resolve, reject) => {
  server.close((err) => {
    if (err) {
      console.error('Error closing the server:', err);
      reject(err);
    } else {
      console.log('Server closed successfully.');
      resolve();
    }
  });
});

module.exports = { app, closeServer };

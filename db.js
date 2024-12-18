const moogoose = require('mongoose');
require('dotenv').config();

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

// connect to mongodb
function connectToMongoDB() {
    console.log('connecting to db...')
    moogoose.connect(MONGODB_CONNECTION_URL);

    moogoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    moogoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };
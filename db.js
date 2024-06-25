const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotel';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', () => { console.log('connnected error') });
db.on('disconnected', () => { console.log('connnected disconnected') });
db.on('connected', () => { console.log('connnected successfully') });

module.exports = db;
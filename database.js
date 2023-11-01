const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/library';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
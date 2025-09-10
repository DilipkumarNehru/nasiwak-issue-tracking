'use strict';
const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/nasiwak';

mongoose.set('strictQuery', true);

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = db;

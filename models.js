const mongoose = require('mongoose');

// Author Schema
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
});

const Author = mongoose.model('Author', authorSchema);

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genre: String,
});

const Book = mongoose.model('Book', bookSchema);


const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, unique: true},
    email: { type: String, unique: true, required: true },
    // Other member-related fields can be added as needed
  });
  
  const Member = mongoose.model('Member', memberSchema );

module.exports = { Author, Book ,Member};
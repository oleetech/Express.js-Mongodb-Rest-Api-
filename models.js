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
  quantity: { type: Number, default: 0 }, // Inventory quantity field
});

const Book = mongoose.model('Book', bookSchema);


const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, unique: true},
    email: { type: String, unique: true, required: true },
    // Other member-related fields can be added as needed
  });
  
  const Member = mongoose.model('Member', memberSchema );


// Define the schema for book loans
const loanSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
  });
  
const Loan = mongoose.model('Loan', loanSchema );  

const stockbookSchema = new mongoose.Schema({
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now },
  });
  
  const Stockbook = mongoose.model('Stockbook', stockbookSchema);


  const reservationSchema = new mongoose.Schema({
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    reservationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: 'pending',
    },
  });
  
  const Reservation = mongoose.model('Reservation', reservationSchema);



  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  
  const User = mongoose.model('User', userSchema);

module.exports = { Author, Book ,Member,Loan,Stockbook,Reservation,User};
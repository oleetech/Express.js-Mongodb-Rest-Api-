// routes.js
const express = require('express');
const router = express.Router();
const { Author, Book,Member,Loan,Stockbook } = require('./models');

// Define your CRUD routes here

router.get('/authors', async (req, res) => {
    try {
      const authors = await Author.find();
      res.json(authors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve authors' });
    }
  });

router.post('/authors', async (req, res) => {
    try {
      const { name, bio } = req.body;
      const newAuthor = new Author({ name, bio });
      const savedAuthor = await newAuthor.save();
      res.json(savedAuthor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create author' });
    }
  });


// Find an author by ID
router.get('/authors/:id', async (req, res) => {
    try {
      const authorId = req.params.id;
      const author = await Author.findById(authorId);
  
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
  
      res.json(author);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to find author' });
    }
  });

// Advanced Search
router.get('/advanced-search', async (req, res) => {
    try {
      const title = req.query.title; // Get the title from the query parameter
      const author = req.query.author; // Get the author from the query parameter
      const genre = req.query.genre; // Get the genre from the query parameter
  
      // Implement your advanced search logic here based on the query parameters
      // Example: Search books by title, author, and genre
      const query = {};
  
      if (title) query.title = new RegExp(title, 'i');
      if (author) query.author = new RegExp(author, 'i');
      if (genre) query.genre = new RegExp(genre, 'i');
  
      const results = await Book.find(query);
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Advanced search failed' });
    }
  });

// Insert multiple authors
router.post('/multiple-authors', async (req, res) => {
    try {
      const authorsData = req.body;
  
      // Ensure authorsData is an array
      if (!Array.isArray(authorsData)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
      }
  
      const insertedAuthors = await Author.insertMany(authorsData);
      res.json(insertedAuthors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert authors' });
    }
  });
  
// Update an author by ID
router.put('/authors/:id', async (req, res) => {
    try {
      const authorId = req.params.id;
      const { name, bio } = req.body;
  
      const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        { name, bio },
        { new: true } // To return the updated author
      );
  
      if (!updatedAuthor) {
        return res.status(404).json({ error: 'Author not found' });
      }
  
      res.json(updatedAuthor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update author' });
    }
  });

// Multiple update of authors
router.put('/multiple-authors', async (req, res) => {
    try {
      const updatedAuthors = req.body;
  
      // Ensure updatedAuthors is an array
      if (!Array.isArray(updatedAuthors)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
      }
  
      const updatePromises = updatedAuthors.map(async (authorData) => {
        const authorId = authorData._id; // Use the author's ID for identification
        return Author.updateOne({ _id: authorId }, authorData);
      });
  
      await Promise.all(updatePromises);
  
      res.json({ message: 'Authors updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update authors' });
    }
  });
  // Delete an author by ID
router.delete('/authors/:id', async (req, res) => {
    try {
      const authorId = req.params.id;
  
      const deletedAuthor = await Author.findByIdAndDelete(authorId);
  
      if (!deletedAuthor) {
        return res.status(404).json({ error: 'Author not found' });
      }
  
      res.json({ message: 'Author deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete author' });
    }
  });

    // Multiple delete of authors
router.delete('/multiple-authors', async (req, res) => {
    try {
      const authorIds = req.body;
  
      // Ensure authorIds is an array
      if (!Array.isArray(authorIds)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array of author IDs.' });
      }
  
      const deletePromises = authorIds.map((authorId) => {
        return Author.deleteOne({ _id: authorId });
      });
  
      await Promise.all(deletePromises);
  
      res.json({ message: 'Authors deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete authors' });
    }
  });


// Find a book by ID
router.get('/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to find book' });
    }
  });
  

// Get a specific book by ID
router.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  });

router.post('/books', async (req, res) => {
    try {
      const { title, author, genre } = req.body;
      const newBook = new Book({ title, author, genre });
      const savedBook = await newBook.save();
      res.json(savedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create book' });
    }
  });

// Insert multiple books
router.post('/multiple-books', async (req, res) => {
    try {
      const booksData = req.body;
  
      // Ensure booksData is an array
      if (!Array.isArray(booksData)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
      }
  
      const insertedBooks = await Book.insertMany(booksData);
      res.json(insertedBooks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert books' });
    }
  });

// Update a book by ID
router.put('/books/:id', async (req, res) => {
    try {
      const { title, author, genre } = req.body;
      const bookId = req.params.id;
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { title, author, genre },
        { new: true }
      );
      res.json(updatedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update book' });
    }
  });


 // Multiple update of books
router.put('/multiple-books', async (req, res) => {
    try {
      const updatedBooks = req.body;
  
      // Ensure updatedBooks is an array
      if (!Array.isArray(updatedBooks)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
      }
  
      const updatePromises = updatedBooks.map(async (bookData) => {
        const bookId = bookData._id; // Use the book's ID for identification
        const { title, author, genre } = bookData;
  
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { title, author, genre },
          { new: true }
        );
  
        if (!updatedBook) {
          return res.status(404).json({ error: 'Book not found' });
        }
      });
  
      await Promise.all(updatePromises);
  
      res.json({ message: 'Books updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update books' });
    }
  });
   

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      await Book.findByIdAndDelete(bookId);
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  });

// Multiple delete of books
router.delete('/multiple-books', async (req, res) => {
    try {
      const bookIds = req.body;
  
      // Ensure bookIds is an array
      if (!Array.isArray(bookIds)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array of book IDs.' });
      }
  
      const deletePromises = bookIds.map((bookId) => {
        return Book.deleteOne({ _id: bookId });
      });
  
      await Promise.all(deletePromises);
  
      res.json({ message: 'Books deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete books' });
    }
  });










// Create a new member
router.post('/members', async (req, res) => {
    try {
      const { name, email } = req.body;
      const newMember = new Member({ name, email });
      const savedMember = await newMember.save();
      res.json(savedMember);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create member' });
    }
  });
  
  // Get all members
  router.get('/members', async (req, res) => {
    try {
      const members = await Member.find();
      res.json(members);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve members' });
    }
  });
  
  // Get a member by ID
  router.get('/members/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
      const member = await Member.findById(memberId);
  
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      res.json(member);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to find member' });
    }
  });
  
  // Update a member by ID
  router.put('/members/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
      const { name, email } = req.body;
  
      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        { name, email },
        { new: true }
      );
  
      if (!updatedMember) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      res.json(updatedMember);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update member' });
    }
  });
  
  // Delete a member by ID
  router.delete('/members/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
  
      const deletedMember = await Member.findByIdAndDelete(memberId);
  
      if (!deletedMember) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      res.json({ message: 'Member deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete member' });
    }
  });
  

  
// Create a new loan
router.post('/loans', async (req, res) => {
    try {
      const { book, member, dueDate } = req.body;
      const newLoan = new Loan({ book, member, dueDate });
      const savedLoan = await newLoan.save();
      res.json(savedLoan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create loan' });
    }
  });
  
  // Get all loans
  router.get('/loans', async (req, res) => {
    try {
      const loans = await Loan.find();
      res.json(loans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve loans' });
    }
  });
  
  // Get a loan by ID
  router.get('/loans/:id', async (req, res) => {
    try {
      const loanId = req.params.id;
      const loan = await Loan.findById(loanId);
  
      if (!loan) {
        return res.status(404).json({ error: 'Loan not found' });
      }
  
      res.json(loan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to find loan' });
    }
  });
  
  // Update a loan by ID
  router.put('/loans/:id', async (req, res) => {
    try {
      const loanId = req.params.id;
      const { book, member, dueDate, returnDate } = req.body;
  
      const updatedLoan = await Loan.findByIdAndUpdate(
        loanId,
        { book, member, dueDate, returnDate },
        { new: true }
      );
  
      if (!updatedLoan) {
        return res.status(404).json({ error: 'Loan not found' });
      }
  
      res.json(updatedLoan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update loan' });
    }
  });
  
  // Delete a loan by ID
  router.delete('/loans/:id', async (req, res) => {
    try {
      const loanId = req.params.id;
  
      const deletedLoan = await Loan.findByIdAndDelete(loanId);
  
      if (!deletedLoan) {
        return res.status(404).json({ error: 'Loan not found' });
      }
  
      res.json({ message: 'Loan deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete loan' });
    }
  });

  

// Save a stockbook entry
router.post('/add-stockbook', async (req, res) => {
    try {
      const { book, quantity } = req.body;
  
      // Create a stockbook entry
      const stockbookEntry = new Stockbook({ book: book, quantity });
      await stockbookEntry.save();
  
      // Update the book's quantity
      await Book.findByIdAndUpdate(book, { $inc: { quantity } });
  
      res.json(stockbookEntry);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save stockbook entry' });
    }
  });
  
module.exports = router;

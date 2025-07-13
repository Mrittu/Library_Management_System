const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get single book by ID
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Add a book
router.post('/', async (req, res) => {
  const { title, author, genre, availableCopies } = req.body;
  const newBook = new Book({ title, author, genre, availableCopies });
  const savedBook = await newBook.save();
  res.status(201).json(savedBook);
});

// Update a book
router.put('/:id', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
});

// Delete a book
router.delete('/:id', async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  res.json(deletedBook);
});

module.exports = router;

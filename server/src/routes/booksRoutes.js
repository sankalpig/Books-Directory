const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const { getBooks, postThebooks, deleteThebooks, searchThebooks, genresThebooks, updateThebooks } = require('../controllers/booksControllers');

// GET all books
router.get('/', getBooks);

// POST: Add a new book
router.post('/', postThebooks);

// PUT: Update a book by ID
router.put('/:id', updateThebooks);

// DELETE: Remove a book by ID
router.delete('/:id', deleteThebooks);


router.get('/search', searchThebooks);

router.get('/genres', genresThebooks);


module.exports = router;

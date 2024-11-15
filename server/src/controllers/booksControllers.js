const Book = require("../models/Books");

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(201).json({ Books: books, message: "succes" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const postThebooks = async (req, res) => {
    const { title, author, genre, publishedYear, description } = req.body;
    // console.log(req.body);
    try {
        const newBook = new Book({ title, author, genre, publishedYear, description });
        await newBook.save();
        res.status(201).json({ Book: newBook, message: "success" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const updateThebooks = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(201).json({ message: 'Book not found' });
        res.status(201).json({ updatedBook: updatedBook, message: "success" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

};
const deleteThebooks = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(201).json({ message: 'Book not found' });
        res.status(201).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};
const searchThebooks = async (req, res) => {
    const { query } = req.query; // `query` is the search keyword
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } },
            ],
        });
        res.status(201).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};
const genresThebooks = async (req, res) => {
    try {
        const genres = await Book.distinct('genre');
        res.status(201).json(genres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getBooks,
    postThebooks,
    updateThebooks,
    deleteThebooks,
    searchThebooks,
    genresThebooks
};
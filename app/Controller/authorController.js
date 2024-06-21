const Authors = require('../models/authors');

const getAllAuthors = async (req, res) => { 
    try {
        const authors = await Authors.find({});
        res.status(200).json({
            data: authors,
            success: true,
            message: `${req.method} - Request to author endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Authors.findById(id);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: `Author with id ${id} not found`
            });
        }
        res.status(200).json({
            data: author,
            success: true,
            message: `${req.method} - Request to author endpoint with id`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

const createAuthor = async (req, res) => {
    const { author } = req.body;
    try {
        const newAuthor = await Authors.create(author);
        res.status(200).json({
            data: newAuthor,
            success: true,
            message: `${req.method} - Request to author endpoint`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Authors.findByIdAndUpdate(id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({
                success: false,
                message: `Author with id ${id} not found`
            });
        }
        res.status(200).json({
            data: author,
            success: true,
            message: `${req.method} - Request to author endpoint with id`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Authors.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: `Author with id ${id} not found`
            });
        }
        res.status(200).json({
            data: author,
            success: true,
            message: `${req.method} - Request to author endpoint with id`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

const addBooksToAuthor = async (req, res) => {
    const { id } = req.params;
    const { books } = req.body;
    try {
        // Find author by ID
        const author = await Authors.findById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: `Author with id ${id} not found`
            });
        }

        // Update author's books array
        author.books.push(...books); // Assuming books is an array of strings

        // Save updated author to database
        const updatedAuthor = await author.save();

        // Respond with updated author
        res.status(200).json({
            data: updatedAuthor,
            success: true,
            message: `${req.method} - Added books to author with id ${id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    addBooksToAuthor, // Ensure this function is exported
};

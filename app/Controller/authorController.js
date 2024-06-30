const Authors = require('../models/authors');

const getAllAuthors = async (req, res) => { 
    try {
        let queryString = JSON.stringify(req.query);

        queryString = queryString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );
        const parsedQuery = JSON.parse(queryString);
        console.log(parsedQuery);

        let query = Authors.find(parsedQuery);

        if (req.query.select){
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        if (req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        const page = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;

        query.skip(skip).limit(limit);

        const authors = await query;
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
        res.status(201).json({
            data: newAuthor,
            success: true,
            message: `${req.method} - Created new author`
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
            message: `${req.method} - Updated author with id ${id}`
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
            message: `${req.method} - Deleted author with id ${id}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

const addMangaToAuthor = async (req, res) => {  // Renamed from addBooksToAuthor
    const { id } = req.params;
    const { manga } = req.body;  // Changed from books to manga
    try {
        const author = await Authors.findById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: `Author with id ${id} not found`
            });
        }

        author.manga.push(...manga);  // Changed from books to manga

        const updatedAuthor = await author.save();

        res.status(200).json({
            data: updatedAuthor,
            success: true,
            message: `${req.method} - Added manga to author with id ${id}`
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
    addMangaToAuthor,  // Renamed from addBooksToAuthor
};

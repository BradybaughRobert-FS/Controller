const getAllAuthors = (req, res) => { 
    res.status(200).json({
        success: true,
        message: `${req.method} - Request to author endpoint`
    });
};

const getAuthorById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        id,
        success: true,
        message: `${req.method} - Request to author endpoint with id`
    });
};

const createAuthor = (req, res) => {
    res.status(200).json({
        success: true,
        message: `${req.method} - Request to author endpoint`
    });
};

const updateAuthor = (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        id,
        success: true,
        message: `${req.method} - Request to author endpoint with id`
    });
};

const deleteAuthor = (req, res) => {    
    const { id } = req.params;
    res.status(200).json({
        id,
        success: true,
        message: `${req.method} - Request to author endpoint with id`
    });
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
};
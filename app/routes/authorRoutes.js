const router = require('express').Router();
const {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    addMangaToAuthor  // Renamed from addBooksToAuthor
} = require('../Controller/authorController'); 

router.get('/', getAllAuthors);

router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

router.put("/:id/manga", addMangaToAuthor);  // Changed route from books to manga

module.exports = router;

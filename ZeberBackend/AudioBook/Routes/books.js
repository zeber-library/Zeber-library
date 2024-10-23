const express = require("express");
const { bookObject } = require("../DB");
const router = express.Router();

router.use(express.json());

router.get('/getAll', async(req, res) => {
    const books = await bookObject.find();

    return res.status(200).json({
        books: books
    })
})

router.post('/addBook', async(req, res) => {
    const body = req.body;

    const book = await bookObject.create(body.book);
    res.send(book);
})

module.exports = router;
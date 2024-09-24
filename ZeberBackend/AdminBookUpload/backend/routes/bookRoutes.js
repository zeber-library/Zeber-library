const express = require('express');
const multer = require('multer');
const Book = require('../models/book');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
require("dotenv").config();
const storage = multer.memoryStorage();
const upload = multer({ storage });
cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    cloud_name:process.env.CLOUDINARY_NAME,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})
// Helper function to upload a file to Cloudinary
const uploadToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto', public_id: fileName },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      });
    uploadStream.end(fileBuffer);
  });
};

// POST route to publish a new book
router.post('/books', upload.fields([{ name: 'coverImages', maxCount: 5 }, { name: 'popularBooks', maxCount: 5 }]), async (req, res) => {
    try {
        const { title, author, authorDescription, bookDescription, language, pages } = req.body;

        // Upload coverImages to Cloudinary
    const coverImageUploads = req.files['coverImages'] ? 
    Promise.all(req.files['coverImages'].map(file => uploadToCloudinary(file.buffer, file.originalname))) : 
    [];

  // Upload popularBooks to Cloudinary
  const popularBookUploads = req.files['popularBooks'] ? 
    Promise.all(req.files['popularBooks'].map(file => uploadToCloudinary(file.buffer, file.originalname))) : 
    [];

  // Wait for all uploads to finish
  const coverImages = await coverImageUploads;
  const popularBooks = await popularBookUploads;
        const newBook = new Book({
            title,
            author,
            authorDescription,
            bookDescription,
            language,
            pages,
            coverImages,
            popularBooks,
        });

        await newBook.save();
        res.status(201).json({ message: 'Book published successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to publish the book.' });
    }
});

router.get('/getbooks', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch books.' });
    }
});
module.exports = router;

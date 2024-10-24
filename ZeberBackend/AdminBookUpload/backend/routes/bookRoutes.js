const express = require('express');
const multer = require('multer');
const Book = require('../models/book');
const mongoose = require('mongoose');
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
        const { title, author, authorDescription, bookDescription, language, pages, summary, category } = req.body;

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
            summary, 
            category
        });

        await newBook.save();
        res.status(201).json({ message: 'Book published successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to publish the book.' });
    }
});
// Route to add a comment to a book
router.post('/:bookId/comments', async (req, res) => {
  try {
    const { text, userId } = req.body;
 
    // Validate userId and bookId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json({ message: 'Invalid user or book ID' });
    }
    
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Add the comment to the book
    const newComment = { user: userId, text, likes: [] };

    book.comments.push(newComment);
        await book.save();

        res.status(201).json(book);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

// Route to add or update a rating for a book
router.post('/:bookId/rating', async (req, res) => {
  try {
    const { rating, userId } = req.body;

    // Validate userId, bookId, and rating value
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json({ message: 'Invalid user or book ID' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingRating = book.stars.find(star => star.user.toString() === userId);
    if (existingRating) {
      existingRating.rating = rating; // Update existing rating
    } else {
      book.stars.push({ user: userId, rating }); // Add new rating
    }

    await book.save();
    res.status(201).json({ message: 'Rating submitted successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting rating', error });
  }
});

// Route to like a comment
router.post('/:bookId/comments/:commentId/like', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId, bookId, and commentId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(req.params.bookId) || !mongoose.Types.ObjectId.isValid(req.params.commentId)) {
      return res.status(400).json({ message: 'Invalid user, book, or comment ID' });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const comment = book.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.likes.includes(userId)) {
      return res.status(400).json({ message: 'Already liked this comment' });
    }

    comment.likes.push(userId);
    await book.save();

    res.status(200).json({ message: 'Comment liked successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like the comment', error });
  }
});

// Route to get comments for a specific book
router.get('/:bookId/comments', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ comments: book.comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

// Route to fetch ratings for a specific book
router.get('/:bookId/ratings', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const totalRatings = book.stars.length;
    const averageRating = totalRatings > 0
      ? (book.stars.reduce((acc, star) => acc + star.rating, 0) / totalRatings).toFixed(2)
      : 0;

    res.status(200).json({
      totalRatings,
      averageRating,
      ratings: book.stars // Send the ratings array
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ratings', error });
  }
});

// Route to fetch all books (optional search term)
router.get('/books', async (req, res) => {
  const searchTerm = req.query.q || '';
  try {
    const books = await Book.find({
      title: { $regex: searchTerm, $options: 'i' } // Case-insensitive search by title
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
});

// Route to fetch all books without search term
router.get('/getbooks', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
});

module.exports = router;
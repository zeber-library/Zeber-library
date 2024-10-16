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
// Route to add a comment to a specific book
router.post('/:bookId/comments', async (req, res) => {
  try {
      const { text, userId } = req.body; // Assuming you're getting the userId from a request
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
      res.status(500).json({ message: 'Error adding comment', error });
  }
});

// routes/book.js

// Route to add or update a rating for a book
router.post('/:bookId/rating', async (req, res) => {
  try {
      const { rating, userId } = req.body;  // User's rating and userId from the request body
      const book = await Book.findById(req.params.bookId);

      if (!book) {
          return res.status(404).json({ message: 'Book not found' });
      }

      // Check if the user has already rated the book
      const existingRating = book.stars.find(star => star.user.toString() === userId);
      if (existingRating) {
          // Update the existing rating
          existingRating.rating = rating;
      } else {
          // Add a new rating
          book.stars.push({ user: userId, rating });
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
    const { userId } = req.body;  // Assuming userId is sent in request body
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const comment = book.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user has already liked the comment
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

// Route to get comments for a specific book without populating the user
router.get('/:bookId/comments', async (req, res) => {
  try {
      const book = await Book.findById(req.params.bookId);

      if (!book) {
          return res.status(404).json({ message: 'Book not found' });
      }

      // Return the comments for the book
      res.status(200).json({ comments: book.comments });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
  }
});


// Route to fetch ratings for a specific book
router.get('/:bookId/ratings', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Calculate total and average ratings
    const totalRatings = book.stars.length;
    const averageRating = totalRatings > 0
      ? (book.stars.reduce((acc, star) => acc + star.rating, 0) / totalRatings).toFixed(2)
      : 0;

    // Return the ratings
    res.status(200).json({
      totalRatings,
      averageRating,
      ratings: book.stars  // Send the ratings array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch ratings.' });
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

router.get('/books', async (req, res) => {
  const searchTerm = req.query.q || '';
  try {
    const books = await Book.find({
      title: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;

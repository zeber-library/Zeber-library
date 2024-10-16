const mongoose = require('mongoose');

// Comment sub-schema
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a user model
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the comment
}, { timestamps: true });

// Book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorDescription: { type: String, required: true },
    bookDescription: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    summary: { type: String, required: true }, // Added summary field
    category: { type: String, required: true }, // Added category field
    coverImages: [{ type: String }], // Array of file paths
    popularBooks: [{ type: String }], // Array of file paths
    comments: [commentSchema], // Array of comments
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who marked this book as favorite
    stars: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who gave the rating
        rating: { type: Number, required: true, min: 1, max: 5 }, // Star rating between 1 and 5
    }],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);



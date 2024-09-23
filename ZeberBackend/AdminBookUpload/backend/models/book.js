const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorDescription: { type: String, required: true },
    bookDescription: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    coverImages: [{ type: String }],  //Array of File paths
    popularBooks: [{ type: String }],  // Array of file paths
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

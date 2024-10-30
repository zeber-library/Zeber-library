const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://rawalaman0505:FWTKQ9XiTwCabyyB@booksdb.z6b8l.mongodb.net/');

const bookObjectSchema = new mongoose.Schema({
    songName: String,
    filePath: String,
    coverPath: String,
    author: String,
    genre: String,
    Trending: {
        type: Boolean,
        default: false
    }
});

const bookObject = mongoose.model('bookObject', bookObjectSchema);

module.exports = {
    bookObject
}
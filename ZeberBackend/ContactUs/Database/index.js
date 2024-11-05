const { default: mongoose } = require("mongoose");
require("dotenv").config();

const URL = process.env.connection_string;
mongoose.connect(URL);

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    }
})

const EntryObject = mongoose.model("Entry", entrySchema);

module.exports = EntryObject;
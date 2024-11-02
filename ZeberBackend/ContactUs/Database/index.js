const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://rawalaman0505:<db_password>@cluster0.ennnl.mongodb.net/");

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

module.exports = {
    EntryObject
}
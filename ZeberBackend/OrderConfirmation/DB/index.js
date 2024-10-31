const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://admin:9FgCsWeQhXIkCktu@cluster3.zwepkzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3');

const AddressSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    AddressLine: {
        type: String,
        required: true
    }
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Address = mongoose.model("Address", AddressSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
    Address,
    User
}
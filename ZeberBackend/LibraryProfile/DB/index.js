const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://admin:9FgCsWeQhXIkCktu@cluster3.zwepkzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3');

const addressLineSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    AddressLine1: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Country:{ type: String, required: true },
    PostalCode: { type: String, required: true },
    Phone: { type: String, required: true }
});

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    AddressLine: [addressLineSchema] // Array of addressLine objects
});



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});


// My details section 

const UserProfileSchema=new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            
        },
        DOB:{
            type: Date,
            required: true
        },
        phone:{
            type: String,
        },
        }
        
);




const UserProfile=mongoose.model("UserProfile",UserProfileSchema);
const Address = mongoose.model('Address', addressSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
    Address,
    User,
    UserProfile
}
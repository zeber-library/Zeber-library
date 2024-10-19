const express = require('express');
const { Address } = require('../DB/index');
// const { authMiddlewares } = require('../middlewares/auth');
const Router = express.Router();

Router.post("/add", async (req, res) => {
    try{
        const {ID, AddressLine} = req.body;
        console.log('body', req.body);
        const IsAddress = await Address.findOne({userId: ID})
        if(!IsAddress){

        
        const newAddress = new Address({
            userId: ID,
            AddressLine: [
                {
                    firstName: AddressLine.firstName,
                    lastName: AddressLine.lastName,
                    AddressLine1: AddressLine.AddressLine1,
                    City: AddressLine.City,
                    State:AddressLine.State,
                    Country: AddressLine.Country,
                    PostalCode: AddressLine.PostalCode,
                    Phone: AddressLine.Phone
                }
            ]
        });
        
        await newAddress.save();

        // console.log('dbObject', newAddress);

        return res.status(200).json(newAddress)
    }
    else{
        const address = await Address.findOneAndUpdate({userId: ID}, {$push: {AddressLine: AddressLine}}, {new: true});
        // console.log('address', address);
        return res.status(200).json(address);
    }
    }catch(err){
        res.status(500).send(err);
    }
})

Router.post("/update", async (req, res) => {
    try {
        const { ID, AddressLine, index } = req.body;

        // Check if the user exists
        const userAddress = await Address.findOne({ userId: ID });
        if (!userAddress) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the index is within bounds
        if (index < 0 || index >= userAddress.AddressLine.length) {
            return res.status(400).json({ message: 'Invalid index' });
        }

        // Use $set to update the specific index in AddressLine array
        const updateKey = `AddressLine.${index}`;
        const updatedAddress = await Address.findOneAndUpdate(
            { userId: ID },
            { $set: { 
                [`${updateKey}.firstName`]: AddressLine.firstName,
                [`${updateKey}.lastName`]: AddressLine.lastName,
                [`${updateKey}.AddressLine1`]: AddressLine.AddressLine1,
                [`${updateKey}.City`]: AddressLine.City,
                [`${updateKey}.State`]: AddressLine.State,
                [`${updateKey}.Country`]: AddressLine.Country,
                [`${updateKey}.PostalCode`]: AddressLine.PostalCode,
                [`${updateKey}.Phone`]: AddressLine.Phone
            }},
            { new: true } // Return the updated document
        );

        return res.status(200).json(updatedAddress);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});



Router.patch('/delete', async (req, res) => {
    try {
        const { ID, index } = req.body; // Get user ID and index from request body

        // Validate inputs
        if (!ID || index === undefined) {
            return res.status(400).json({ message: 'User ID and index are required' });
        }

        // Find the address document for the user
        const address = await Address.findOne({ userId: ID });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Ensure the index is valid
        if (index >= 0 && index < address.AddressLine.length) {
            address.AddressLine.splice(index, 1); // Remove the address line at the specified index
            await address.save(); // Save the updated document
            return res.status(200).json({ message: 'Address line deleted successfully', address });
        } else {
            return res.status(400).json({ message: 'Invalid index' });
        }
    } catch (err) {
        console.error('Error updating address:', err);
        res.status(500).send('Server Error');
    }
});











Router.get("/get", async (req, res) => {
    try{
        const {ID} = req.query;
        const address = await Address.findOne({userId: ID});
        // console.log(address);
        return res.status(200).json(address);
    }catch(err){
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = Router;
const express = require('express');
const { Address, User } = require('../DB/index');
const { authMiddlewares } = require('../middlewares/auth');
const Router = express.Router();

Router.get("/getAll", authMiddlewares, async (req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email: email});

        const address = await Address.find({userId: user._id});
        // console.log(address);

        return res.status(200).json({
            Address: address
        })
        
    }catch(err){
        return res.status(500).send(err);
    }
})

Router.post("/add", authMiddlewares, async (req, res) => {
    try{
        const {AddressLine, name, Phone, email} = req.body;
        // console.log('body', req.body);
        
        const user = await User.findOne({email: email});

        const ADDRESS = await Address.create({
            userId: user._id,
            AddressLine: AddressLine,
            name: name,
            Phone: Phone
        })

        const address = await Address.find({userId: user._id});

        // console.log('dbObject', address);

        return res.status(200).json({
            addressID: ADDRESS._id,
            addressArray: address
        })
    }catch(err){
        res.status(500).send(err);
    }
})

Router.put("/update", authMiddlewares,async (req, res) => {
    try{
        const body = req.body;
        console.log(req.body);
        
        const address = await Address.findOneAndUpdate({_id: body.address.ID}, {$set: body.address});

        const user = await User.findOne({email: body.email});
        
        const addresses = await Address.find({userId: user._id});
        console.log('AMAN', addresses);
        
        return res.status(200).json({
            addressID: address._id,
            address: addresses
        })
    }
    catch(err){
        res.status(500).send(err);
    }
})

Router.delete("/delete/:addressID", authMiddlewares, async(req, res) => {
    try{
        const body = req.body;
        console.log(body)
        const ID = req.params.addressID;

        await Address.deleteOne({_id: ID});
        const user = await User.findOne({email: body.email});

        const addresses = await Address.find({userId: user._id});
        console.log(addresses)

        return res.status(200).json({
            address: addresses
        })
    }catch(err){
        return res.status(500).send(err);
    }
})

module.exports = Router;
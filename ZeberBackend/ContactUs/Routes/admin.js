const express = require("express");
const Router = express.Router();
const EntryObject = require("../Database/index");

Router.get('/messages', async (req, res) => {
    try{
        const messages = await EntryObject.find();

        return res.status(200).json({
            message: "OK",
            messages: messages
        });
    }
    catch(err){
        return res.status(500).json({message: "Internal Server Error!"});
    }
})

module.exports = Router;
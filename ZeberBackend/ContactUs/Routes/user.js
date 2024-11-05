const express = require("express");
const Router = express.Router();
const EntryObject = require("../Database/index");

Router.post("/message", async (req, res) => {
    try{
        const body = req.body;

        await EntryObject.create({
            name: body.name,
            email: body.email,
            message: body.message
        });

        return res.status(201).json({message: "Created"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }
});

module.exports = Router;
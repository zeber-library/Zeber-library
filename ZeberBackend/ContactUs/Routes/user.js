const express = require("express");
const Router = express.Router();
const EntryObject = require("../Database/index");

Router.post("/message", async (req, res) => {
    try{
        const body = req.body;

        await EntryObject.create({ body });

        return res.status(202).json({message: Accepted});
    }
    catch{
        return res.status(500).json({message: Server_Error});
    }
})

module.exports = Router;
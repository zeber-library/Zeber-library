const express = require("express");
const Router = express.Router();
const userRouter = require("./user");
const adminRouter = require("./admin");

Router.use("/user", userRouter);
Router.use("/admin", adminRouter);

module.exports = Router;
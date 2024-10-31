const express = require('express');
const router = express.Router();
const loginRouter = require('./login'); // Login-related routes
const addressRouter = require('./address'); // Address-related routes

router.use('/login', loginRouter);
router.use('/addresses', addressRouter);

module.exports = router;

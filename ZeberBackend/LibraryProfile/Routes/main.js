const express = require('express');
const router = express.Router();
const loginRouter = require('./login'); // Login-related routes
const addressRouter = require('./address'); // Address-related routes
const profileUserRouter=require('./profileUser'); 


// Mount the login and address routes on their respective paths
router.use('/login', loginRouter);
router.use('/addresses', addressRouter);
router.use('/profileUser',profileUserRouter )
module.exports = router;

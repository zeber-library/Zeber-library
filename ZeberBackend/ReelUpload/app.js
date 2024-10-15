const express = require('express');
const cors = require('cors');

const app=express()
app.use(cors())
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


const reelRoutes = require('./routes/reelRoutes');

// Routes
app.use('/api/reels', reelRoutes);

module.exports=app;
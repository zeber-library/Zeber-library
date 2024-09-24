const express = require("express");
const multer = require("multer");
const storage = require("../utils/cloudinary");
const { handleUpload , handleSendMail } = require('../controller/handlefunction');
const filedata = require('../model/filedata');


const router = express.Router();



// Create multer instance for multiple file uploads
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  }
});

// Home Page Route
router.get("/", (req, res) => {
  return res.render('homepage');
});


router.post("/upload", upload.fields([
  { name: 'bookImage', maxCount: 1 },
  { name: 'bookPDF', maxCount: 1 }
]), handleUpload);





//===========================================



// Email Submission Routes
router.get("/submit-email", (req, res) => {
  return res.render('email');
});

router.post('/submit-email', handleSendMail);

// Admin Page - Fetch All Records (Read)
router.get('/admin', async (req, res) => {
  try {
    const data = await filedata.find(); // Fetch all documents
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Page - Create Record (Create)
router.post('/admin', async (req, res) => {
  try {
    const newData = new filedata(req.body); // Create a new document
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Page - Update Record (Update)
router.put('/admin/:id', async (req, res) => {
  try {
    const updatedData = await filedata.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Page - Delete Record (Delete)
router.delete('/admin/:id', async (req, res) => {
  try {
    const deletedData = await filedata.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const Reel = require('../models/reelModel');
const main=require('../server.js')
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});
// Helper function to upload a video file to Cloudinary
const uploadToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', public_id: fileName},  // Specify video as resource type
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);  // Returns the secure URL of the uploaded video
        }
      }
    );
    
    uploadStream.end(fileBuffer);  // End the stream and pass the video buffer
  });
};

// Upload Reel
exports.uploadReel = async (req, res) => {
  const { title,description } = req.body;
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const fileBuffer = req.file.buffer; // Get the video buffer from multer memory storage
    const fileName = req.file.originalname.split('.')[0];  // Extract filename without extension

    // Upload the video buffer to Cloudinary and get the URL
    const videoUrl = await uploadToCloudinary(fileBuffer, fileName);

    // Save the reel with the Cloudinary video URL in the database
    const newReel = new Reel({
      title,
      description,
      videoUrl
    });

    await newReel.save();
    res.json(newReel);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error uploading reel',
      error: error.message
    });
  }
};
// get all reels
exports.getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find();
    res.json(reels);
  } catch (error) {
    res.status(500).send('Error getting reels');
  }
}
// Like a Reel
exports.AddLikeReel = async (req, res) => {
  try {
    const reelId = req.params.id;
  const updatedReel=await Reel.findByIdAndUpdate(reelId, {
    $addToSet: { likes: req.body.userId }},{new:true})
    const reels=await Reel.find()
    main.io.emit("add-like",reels)
    console.log(updatedReel)
    res.json(reels)
  } catch (error) {
    res.status(500).send('Error adding like');
  }
};
exports.RemoveLikeReel=async(req,res)=>{
  try{
    const reelId = req.params.id;
    const updatedReel=await Reel.findByIdAndUpdate(reelId, {
      $pull: { likes: req.body.userId }},{new:true})
      const reels=await Reel.find()
      main.io.emit("remove-like",reels)
     console.log(updatedReel)
     res.json(reels)
  }catch(error){
    res.status(500).send('Error removing like');
  }
}



exports.commentReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).send('Reel not found');

    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: 'Comment text cannot be empty' });
    }

    // Add the new comment
    const comment = { userId: req.body.userId, text: text.trim() };
    reel.comments.push(comment);
    await reel.save();

    // Emit the new comment to all connected clients
    main.io.emit('newComment', { reelId: reel._id, comment });

    res.status(201).json({ message: 'Comment added', reel });
  } catch (error) {
    console.error("error",error);  // Logging the error for debugging
    res.status(500).json({ error: 'Error commenting on reel' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const reelId = req.params.id;

    // Fetch the reel by its ID, selecting only the comments field
    const reel = await Reel.findById(reelId).select('comments');

    if (!reel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    // Return the comments
    res.status(200).json({ comments: reel.comments });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Server error while fetching comments' });
  }
};




exports.saveReel =async (req, res) => {
try{
  const reelId = req.params.id;
  const reel = await Reel.findById(reelId);
  if (!reel) {
    return res.status(404).json("reel not found")
  }
  reel.isSave = !reel.isSave;
  await reel.save();
  const reels = await Reel.find();
  main.io.emit("save-reel",reels)
}catch(error){
   return res.status(501).json(error)
}


}

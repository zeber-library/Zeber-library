const express = require('express');
const router = express.Router();
const reelController = require('../controllers/reelController');
// const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Reel Routes
router.post('/upload',upload.single('video'), reelController.uploadReel);
router.get('/', reelController.getAllReels);
router.put('/:id/Addlike',reelController.AddLikeReel);
router.put('/:id/Removelike',reelController.RemoveLikeReel);
router.post('/:id/comment', reelController.commentReel);
router.get('/:id/getComments',reelController.getComments)
router.post('/:id/saveReel',reelController.saveReel)

module.exports = router;

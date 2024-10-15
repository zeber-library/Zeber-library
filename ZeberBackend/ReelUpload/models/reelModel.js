const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  title: String,
  description:String,
  videoUrl: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String }],
  shares: { type: Number, default: 0 },
  isSave: {
    type: Boolean,
    default: false,
          },
    
}, { timestamps: true });

module.exports = mongoose.model('Reel', reelSchema);

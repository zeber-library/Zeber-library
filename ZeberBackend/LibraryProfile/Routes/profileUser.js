const express = require('express');
const ROUTER = express.Router();
// const jwt = require('jsonwebtoken');
const {UserProfile}=require('../DB');
// const {authMiddlewares} = require('../middlewares/auth');
ROUTER.post('/addUserProfile' ,async (req, res) => {
try{
const {userId,firstName,lastName,email,DOB,phone}=req.body;
      const userProfile=await UserProfile.findOne({userId});
      if(!userProfile){
        const newUserProfile=new UserProfile({
            userId,
            firstName,
            lastName,
            email,
            DOB,
            phone
            });
            await newUserProfile.save();
           
            return res.status(200).json(newUserProfile);
        }
        else{
            const updatedUserProfile=await UserProfile.findOneAndUpdate(
                {userId},
                {
                    $set:{
                        firstName,
                        lastName,
                        email,
                        DOB,
                        phone
                    }
                },
                {new:true}
            )
            console.log(updatedUserProfile);
            return res.status(200).json(updatedUserProfile);
        }
}catch(err){
res.status(500).send(err);
}
});


ROUTER.get('/getUserProfile/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const userProfile = await UserProfile.findOne({userId});
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userProfile);
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err.message });
    }

})
module.exports = ROUTER;
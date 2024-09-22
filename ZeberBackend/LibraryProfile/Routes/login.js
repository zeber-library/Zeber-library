const express = require('express');
const router = express.Router();
const client = require('../client');
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { User } = require('../DB');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);// 4-digit OTP

router.post('/sendOTP', async (req, res) => {
    const body = req.body;
    const OTP = generateOtp();
    const OTPexpiry = 300;

    await client.setex(body.email, OTPexpiry, OTP);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: body.email,
        subject: "Login OTP",
        text: `Hey ${body.email}, your OTP for logging into Zeber is ${OTP}!\nThe OTP will be valid for only 5 minutes.`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(info);

    return res.json({ success: true, message: 'OTP sent!' });
})

router.post('/verify-otp', async (req, res) => {
    const {email, OTP} = req.body;
    console.log(req.body);

    await client.get(email, async (err, reply) => {
        if (err || !reply) return res.status(400).json({ success: false, message: 'OTP expired or invalid' });

        if (OTP === reply) {
            const user = await User.findOne({email: email});
            if (!user){
                return res.status(404).json({
                    msg: "User not found!"
                });
            }
            const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
            client.del(email);
            res.json({ success: true, token, id: user._id});
        } else {
            res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    });
});

module.exports = router;
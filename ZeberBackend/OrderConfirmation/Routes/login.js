const express = require('express');
const router = express.Router();
const client = require('../client');
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { User } = require('../DB');
const { authMiddlewares } = require('../middlewares/auth');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);// 4-digit OTP

router.get('/no-otp', authMiddlewares, (req, res) => {
    try {
        return res.status(200).send('ok');
    } catch (err) {
        return res.status(500).send(err);
    }
})

router.post('/sendOTP', async (req, res) => {
    try {
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

        return res.json({ success: true, message: 'OTP sent!' });
    } catch (err) {
        return res.status(500).send(err);
    }
})

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, OTP } = req.body;

        const reply = await client.get(email);  // Promisified call

        if (!reply) {
            return res.status(400).json({ success: false, message: 'OTP expired or invalid' });
        }

        if (OTP === reply) {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found!" });
            }
            const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
            await client.del(email);
            return res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.create({ email, password });
        const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_TOKEN)
        res.status(200).json({ msg: 'User Registered', token })
    }
    catch (err) {
        res.status(400).json({ err })
    }
})

router.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user || !(await user.comparePasswords(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_TOKEN)
        return res.status(200).json({ msg: 'User loggedin successfully', token })
    }
    catch (err) {
        return res.status(400).json({ err })
    }
})

module.exports = router;
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.create({ email, password });
        const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET)
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
        const accessToken = await jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = await jwt.sign({ userId: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/auth/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ msg: 'User loggedin successfully', accessToken })
    }
    catch (err) {
        return res.status(400).json({ err })
    }
})

router.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ err: 'Refresh token is missing' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ err: 'Invalid or expired refresh token' })
        }
        const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        return res.status(200).json({ accessToken })

    })
})

module.exports = router;
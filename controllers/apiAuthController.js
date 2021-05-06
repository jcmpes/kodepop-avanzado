const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
require('dotenv').config();

const apiAuthController = async (req, res, next) =>  { 
    // Check credentials
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        console.log(user)
        if (!user || !(await user.comparePassword(password))) {
            throw('invalid credentials')
        }
        // Generate Token
        console.log(process.env.JWT_TOKEN_SECRET)
        jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h'}, (err, jwtToken) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ token: jwtToken })    
        })
    } catch (error) {
        next(error);
    }
}

module.exports = apiAuthController;

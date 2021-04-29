const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * POST /api/authenticate
 */
const apiAuthController = async (req, res, next) => {
    // Check credentials
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            throw('invalid credentials')
        }
        // Generate Token
        jwt.sign({ _id: user._id }, 'Annie_is_Vader', { expiresIn: '2h'}, (err, jwtToken) => {
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

module.exports = apiAuthController
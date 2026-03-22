const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the Flutter app sent a Token in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using our secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database and attach their profile to 'req.user'
            // We use .select('-password') so we don't accidentally grab their encrypted password
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move on to the next step (The Engine!)
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// This guard checks if the logged-in user is an Admin
const admin = (req, res, next) => {
    // req.user comes from the 'protect' middleware that runs right before this
    if (req.user && req.user.role === 'admin') {
        next(); // They are an Admin, let them through!
    } else {
        res.status(401).json({ message: 'Access denied. You are not an Admin.' });
    }
};
module.exports = { protect, admin };
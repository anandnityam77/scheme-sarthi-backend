const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    try {
        // 1. Catch the data sent from the Flutter app
        const { fullName, mobileNumber, email, password, aadhaar, dob, gender, category, annualIncome, state, district, occupation } = req.body;

        // 2. Check if a user already exists with this Email, Mobile, or Aadhaar
        const userExists = await User.findOne({ $or: [{ email }, { mobileNumber }, { aadhaar }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this Email, Mobile, or Aadhaar' });
        }

        // 3. Security: Encrypt the password and Aadhaar number
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedAadhaar = await bcrypt.hash(aadhaar, salt); 

        // 4. Create the new user blueprint (It won't save until we fix the DB link)
        const user = await User.create({
            fullName,
            mobileNumber,
            email,
            password: hashedPassword,
            aadhaar: hashedAadhaar, // Save the safe, encrypted Aadhaar
            dob,
            gender,
            category,
            annualIncome,
            state,
            district,
            occupation
        });

        // 5. Send a success message and a "Token" back to Sanskriti & Sudiksha's frontend
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function to create the "You are logged in" digital key
// @desc    Authenticate a user (Sign In / Log In)
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    try {
        // 1. Catch the email and password sent from the Flutter app
        const { email, password } = req.body;

        // 2. Look for the user in the database by their email
        const user = await User.findOne({ email });

        // 3. Check if the user exists AND if the typed password matches the encrypted one
        if (user && (await bcrypt.compare(password, user.password))) {
            // Success! Send back the user details and a fresh Token
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role, // Good for knowing if they are an Admin or Citizen
                token: generateToken(user._id)
            });
        } else {
            // Fail! Wrong email or password
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, loginUser };
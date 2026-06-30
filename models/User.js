const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhaar: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true }, 
    annualIncome: { type: Number, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    occupation: { type: String, required: true },
    role: { type: String, default: 'citizen' } 
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
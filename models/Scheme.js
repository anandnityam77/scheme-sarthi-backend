const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    // Basic Details
    schemeName: { type: String, required: true },
    description: { type: String, required: true },
    officialLink: { type: String, required: true }, // The link for citizens to apply

    // Eligibility Rules (The Engine uses these to find matches)
    maxIncomeLimit: { 
        type: Number, 
        default: 999999999 // If there is no limit, we set a really high number
    },
    targetStates: [{ 
        type: String // We use an array [ ] because a scheme might be for multiple states, or 'All'
    }],
    targetOccupations: [{ 
        type: String // e.g., ['Student', 'Farmer/Cultivator', 'All']
    }],
    targetCategories: [{ 
        type: String // e.g., ['General', 'OBC', 'SC', 'ST', 'EWS', 'All']
    }],
    targetGenders: [{
        type: String // e.g., ['Male', 'Female', 'Other', 'All']
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Scheme', schemeSchema);
const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    
    schemeName: { type: String, required: true },
    description: { type: String, required: true },
    officialLink: { type: String, required: true }, 

    
    maxIncomeLimit: { 
        type: Number, 
        default: 999999999 
    },
    targetStates: [{ 
        type: String 
    }],
    targetOccupations: [{ 
        type: String 
    }],
    targetCategories: [{ 
        type: String 
    }],
    targetGenders: [{
        type: String 
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Scheme', schemeSchema);
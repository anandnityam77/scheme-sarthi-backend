const Scheme = require('../models/Scheme');

// @desc    Get schemes the logged-in user is eligible for
// @route   GET /api/schemes/eligible
// @access  Private (Only logged-in users)
const getEligibleSchemes = async (req, res) => {
    try {
        // 1. Get the profile data of the user who is currently logged in
        const user = req.user; 

        // 2. The Matching Algorithm! 
        // We ask MongoDB to find schemes that match ALL of these rules:
        const eligibleSchemes = await Scheme.find({
            // Rule 1: User's income must be LESS THAN or EQUAL TO the scheme's max limit
            maxIncomeLimit: { $gte: user.annualIncome },

            // Rule 2: The scheme's target states must include the User's state OR 'All'
            targetStates: { $in: [user.state, 'All'] },

            // Rule 3: The scheme's target occupations must include the User's occupation OR 'All'
            targetOccupations: { $in: [user.occupation, 'All'] },

            // Rule 4: The scheme's target categories must include the User's category OR 'All'
            targetCategories: { $in: [user.category, 'All'] },

            // Rule 5: The scheme's target genders must include the User's gender OR 'All'
            targetGenders: { $in: [user.gender, 'All'] }
        });

        // 3. Send the customized list of schemes back to the Flutter app!
        res.status(200).json({
            count: eligibleSchemes.length, // Tells the app how many schemes were found
            schemes: eligibleSchemes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new Government Scheme
// @route   POST /api/schemes
// @access  Private (Admins Only)
const createScheme = async (req, res) => {
    try {
        // 1. Grab all the scheme details sent from the frontend/Postman
        const { 
            schemeName, 
            description, 
            officialLink, 
            maxIncomeLimit, 
            targetStates, 
            targetOccupations, 
            targetCategories, 
            targetGenders 
        } = req.body;

        // 2. Ask MongoDB to create and save the new Scheme blueprint
        const scheme = await Scheme.create({
            schemeName,
            description,
            officialLink,
            maxIncomeLimit,
            targetStates,
            targetOccupations,
            targetCategories,
            targetGenders
        });

        // 3. Send the newly created scheme back as proof it worked!
        res.status(201).json(scheme);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getEligibleSchemes, createScheme };
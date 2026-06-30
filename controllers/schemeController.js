const Scheme = require('../models/Scheme');


const getEligibleSchemes = async (req, res) => {
    try {
        
        const user = req.user; 

        
        const eligibleSchemes = await Scheme.find({
            
            maxIncomeLimit: { $gte: user.annualIncome },         
            targetStates: { $in: [user.state, 'All'] },          
            targetOccupations: { $in: [user.occupation, 'All'] },           
            targetCategories: { $in: [user.category, 'All'] },            
            targetGenders: { $in: [user.gender, 'All'] }
        });

        
        res.status(200).json({
            count: eligibleSchemes.length,
            schemes: eligibleSchemes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createScheme = async (req, res) => {
    try {
        
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

       
        res.status(201).json(scheme);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getEligibleSchemes, createScheme };
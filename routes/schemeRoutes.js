const express = require('express');
const router = express.Router();


const { getEligibleSchemes, createScheme } = require('../controllers/schemeController');


const { protect, admin } = require('../middlewares/authMiddleware');




router.get('/eligible', protect, getEligibleSchemes);


router.post('/', protect, admin, createScheme);

module.exports = router;
const express = require('express');
const router = express.Router();

// Here is where we added 'createScheme'
const { getEligibleSchemes, createScheme } = require('../controllers/schemeController');

// Here is where we added 'admin'
const { protect, admin } = require('../middlewares/authMiddleware');

// ---------------------------------------------------
// THE ROUTES (The Doors)
// ---------------------------------------------------

// Door 1: For Citizens to get their matching schemes (Needs 'protect' guard)
router.get('/eligible', protect, getEligibleSchemes);

// Door 2: For Admins to create new schemes (Needs BOTH 'protect' AND 'admin' guards)
router.post('/', protect, admin, createScheme);

module.exports = router;
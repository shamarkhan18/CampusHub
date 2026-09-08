const express = require('express');
const { getProfile, updateProfile } = require('../controllers/UserController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/me', protect, getProfile);
router.patch('/me', protect, updateProfile);

module.exports = router;
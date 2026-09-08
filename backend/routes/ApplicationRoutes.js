const express = require('express');
const {
  listApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/ApplicationController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', listApplications);
router.post('/', createApplication);
router.patch('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
const express = require('express');
const {
  listOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/OpportunityController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/', listOpportunities);
router.get('/:id', getOpportunity);
router.post('/', protect, createOpportunity);
router.patch('/:id', protect, updateOpportunity);
router.delete('/:id', protect, deleteOpportunity);

module.exports = router;
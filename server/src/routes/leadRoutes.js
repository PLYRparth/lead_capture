const express = require('express');
const {
  createLead,
  getLeads,
  updateLeadStatus,
} = require('../controllers/leadController');
const {
  createLeadValidator,
  updateStatusValidator,
  validate,
} = require('../validators/leadValidator');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(createLeadValidator, validate, createLead)
  .get(protect, getLeads);

router
  .route('/:id/status')
  .patch(protect, updateStatusValidator, validate, updateLeadStatus);

module.exports = router;

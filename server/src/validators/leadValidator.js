const { body, validationResult } = require('express-validator');

// Validation rules for creating a new lead
const createLeadValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot be more than 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),
  body('budget')
    .trim()
    .notEmpty()
    .withMessage('Budget range is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long')
    .isLength({ max: 1000 })
    .withMessage('Message cannot be more than 1000 characters'),
];

// Validation rules for updating lead status
const updateStatusValidator = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['New', 'Contacted', 'Closed'])
    .withMessage('Invalid status value'),
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format errors to a simple object
    const formattedErrors = {};
    errors.array().forEach((err) => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
  next();
};

module.exports = {
  createLeadValidator,
  updateStatusValidator,
  validate,
};

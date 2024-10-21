const { body } = require('express-validator');

// Validation for task creation
const validateTask = [
  body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a valid string')
    .notEmpty().withMessage('name cannot be empty'),
  body('description')
    .optional() // Description can be optional
    .isString().withMessage('Description must be a valid string')
];

module.exports = validateTask;
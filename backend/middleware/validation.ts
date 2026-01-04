import { Request, Response, NextFunction } from 'express';
import {
  body,
  param,
  query,
  validationResult,
  ValidationChain,
} from 'express-validator';
import Joi from 'joi';

/**
 * Validation error handler
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array(),
    });
  }

  next();
};

/**
 * Common validation rules
 */
export const validators = {
  // Email validation
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),

  // Password validation
  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),

  // Name validation
  name: body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  // Phone validation
  phone: body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),

  // URL validation
  url: body('url').optional().isURL().withMessage('Invalid URL'),

  // ID validation (MongoDB ObjectId or UUID)
  id: param('id')
    .matches(
      /^[0-9a-fA-F]{24}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    )
    .withMessage('Invalid ID format'),

  // Pagination
  page: query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  limit: query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
};

/**
 * Joi schemas for complex validation
 */
export const schemas = {
  // User registration
  userRegistration: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string().optional(),
    role: Joi.string()
      .valid('student', 'instructor', 'admin')
      .default('student'),
  }),

  // User update
  userUpdate: Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().optional(),
    bio: Joi.string().max(500).optional(),
  }),

  // Course creation
  courseCreation: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(10).max(5000).required(),
    category: Joi.string().required(),
    level: Joi.string()
      .valid('beginner', 'intermediate', 'advanced')
      .required(),
    price: Joi.number().min(0).required(),
    duration: Joi.number().min(1).required(),
    thumbnail: Joi.string().uri().optional(),
  }),

  // Enrollment
  enrollment: Joi.object({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
    paymentMethod: Joi.string().valid('card', 'paypal', 'free').required(),
  }),
};

/**
 * Joi validation middleware
 */
export const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      });
    }

    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

/**
 * Sanitize input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Validate file upload
 */
export const validateFileUpload = (
  allowedTypes: string[],
  maxSize: number = 10 * 1024 * 1024 // 10MB default
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check file type
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type',
        allowed: allowedTypes,
      });
    }

    // Check file size
    if (req.file.size > maxSize) {
      return res.status(400).json({
        error: 'File too large',
        maxSize: `${maxSize / 1024 / 1024}MB`,
      });
    }

    next();
  };
};

export default {
  validators,
  schemas,
  validateSchema,
  handleValidationErrors,
  sanitizeInput,
  validateFileUpload,
};

import { body} from 'express-validator';


export const emailValidationRules = [
    body('email')
        .isEmail().withMessage('Email must be a valid email address')
        .normalizeEmail(), // Normalize email to lowercase
    body('name')
        .isLength({min : 3}).withMessage("Enter At least 3 letters in name"),
    body('address')
        .isLength({min:5}).withMessage("Enter At least 5 letter in address"),
];
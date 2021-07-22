import express from 'express'
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import {validate} from '../middleware/validator.js';

const router = express.Router();

//validate when login
const validateCredential = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('username should not be empty'),
    body('password')
    .trim()
    .isLength({min:5})
    .withMessage('password should be at least 5 characters.'),
    validate,
];

//validate when signup 
const validateSignup = [
    ...validateCredential,
    body('name').trim().notEmpty().withMessage('name is missing!'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email format'),
    body('url').isURL().withMessage('invalid URL format').optional({nullable:true, checkFalsy:true}),
    validate,
];

//POST /auth/signup
router.post('/signup',validateSignup,authController.signup);
//POST /auth/login
router.post('/login',validateCredential,authController.login);

export default router;
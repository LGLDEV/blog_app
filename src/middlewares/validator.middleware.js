import { body } from "express-validator";

export const registerValidator = [
    body('email').isEmail(), 
    body('password').isLength({min: 5}),
    body('name').isLength({min: 3}),
    body('image').optional().isURL()
]

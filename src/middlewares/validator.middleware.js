import { body } from "express-validator";

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),
    body('image').optional().isURL()
]


export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
]

export const blogValidator = [
    body('title', 'Enter blog title').isLength({ min: 3 }).isString(),
    body('text', 'Enter blog text').isLength({ min: 3 }).isString(),
    body('tags', 'Wrong tag format').optional().isArray(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];


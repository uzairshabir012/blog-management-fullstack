const { body, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

const registerUserValidationRules = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),

    body("role")
        .optional()
        .isIn(["user", "author"])
        .withMessage("Role must be user or author"),

    validateResult
];

const loginUserValidationRules = [
    body("email")
        .optional()
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("username")
        .optional()
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),

    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.username) {
            throw new Error("Either email or username is required");
        }

        return true;
    }),

    validateResult
];

const createBlogValidationRules = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 50 })
        .withMessage("Title must not exceed 50 characters"),

    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ max: 10000 })
        .withMessage("Content Limit: 10,000 characters"),

    validateResult
];


const updateBlogValidationRules = [
    body("title")
        .optional()
        .isLength({ max: 50 })
        .withMessage("Title must not exceed 50 characters"),

    body("content")
        .optional()
        .isLength({ max: 10000 })
        .withMessage("Content Limit: 10,000 characters"),

    validateResult
];


module.exports = {
    registerUserValidationRules,
    loginUserValidationRules,
    createBlogValidationRules,
    updateBlogValidationRules
};
import { check } from "express-validator";

export const registrationValidation = [
    check('email').isEmail().withMessage("Invalid Email Address"),
    check('password').isLength({min:6}).withMessage("Minimum Password length is 6").escape(),
    check('name').notEmpty().withMessage("Name Required").escape(),
    check('phone').isNumeric().withMessage("Invalid Phone Number").isLength({min:10,max:10}).withMessage("Phone Number digits should be 10"),
    check('address').notEmpty().withMessage("Address Required").escape(),
    check('pincode').isNumeric().withMessage("Invalid Pincode").isLength({min:6,max:6}).withMessage("Pincode must be 6 digit long")
]

export const validValidation = [
    check('email').isEmail().withMessage("Invalid Email Address"),    
    check('otp').isNumeric().withMessage("Only numeric otp allowed").isLength({min:6,max:6}).withMessage("OTP should be of six digits")
]

export const loginValidation = [
    check('password').isLength({min:6}).withMessage("Minimum Password length is 6").escape(),
    check('email').isEmail().withMessage("Invalid Email Address")
]

export const isbnValidation = [
    check('isbn').isNumeric().withMessage("Invalid ISBN Number").isLength({min:13,max:13}).withMessage("ISBN Number digits should be 13")
]

export const updateGenreValidation = [
    check('genre').notEmpty().withMessage("Genre Required").escape(),
]

export const registerLibrarianValidation = [
    check('email').isEmail().withMessage("Invalid Email Address")
]

export const updateValidation = [
    check('name').notEmpty().withMessage("Name Required").escape(),
    check('phone').isNumeric().withMessage("Invalid Phone Number").isLength({min:10,max:10}).withMessage("Phone Number digits should be 10"),
    check('address').notEmpty().withMessage("Address Required").escape(),
    check('pincode').isNumeric().withMessage("Invalid Pincode").isLength({min:6,max:6}).withMessage("Pincode must be 6 digit long")
]

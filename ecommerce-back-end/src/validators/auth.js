
const { body, validationResult ,check } = require('express-validator');


module.exports.validateSignupRequest = [
    body("firstName").not().isEmpty().trim().withMessage("firstName is required"),
    body("lastName").not().isEmpty().trim().withMessage("lastName is required"),
    body("email").not().isEmpty().withMessage("email is required"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters required")


];

module.exports.validateSigninRequest = [

    body("email").not().isEmpty().withMessage("email is required"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters required")


];


exports.isRequestvalidated=(req,res,next)=>{
    const errors =validationResult(req)
    if(errors.array().length >0){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next();

}
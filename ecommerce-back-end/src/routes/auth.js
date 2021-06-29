const express =require('express');
const {signup,signin,} =require("../controller/auth");
const { body, validationResult ,check } = require('express-validator');
const {validateSignupRequest,isRequestvalidated,validateSigninRequest} =require('../validators/auth')

const router = express.Router();

router.post('/signup',validateSignupRequest,isRequestvalidated,signup);
router.post('/signin',validateSigninRequest,isRequestvalidated,signin);


// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({user:"profille"})
// })

module.exports =router;

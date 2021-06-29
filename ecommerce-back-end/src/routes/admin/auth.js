

const express =require('express');
const router = express.Router();

const {signup,signin,signout} =require("../../controller/admin/auth")
const {requireSignin} =require('../../common-middleware')
const {validateSignupRequest,isRequestvalidated,validateSigninRequest} =require("../../validators/auth")



router.post('/admin/signup',validateSignupRequest,isRequestvalidated,signup);
router.post('/admin/signin',validateSigninRequest,isRequestvalidated,signin);
router.post('/admin/signout',signout);




module.exports =router;

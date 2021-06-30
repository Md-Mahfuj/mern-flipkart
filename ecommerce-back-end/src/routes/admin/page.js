const express =require('express');
const {requireSignin,adminMiddleware} = require("../../common-middleware");
const {upload} =require('../../common-middleware/index');
const {createPage}=require('../../controller/admin/page')
const router = express.Router();



router.post(`/page/create`,requireSignin,adminMiddleware,upload.fields([

    {name: 'banners'},
    {name:'products'}
]),createPage);




module.exports =router;
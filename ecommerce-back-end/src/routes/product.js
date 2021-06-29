const express =require("express");

const {createProduct ,getProductsBySlug}=require("../controller/product")
const {requireSignin,adminMiddleware}= require("../common-middleware/index")
const multer =require("multer");
const shortid=require("shortid");
const path =require('path')

const router =express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '_' +file.originalname )
    }
})
const upload =multer({storage});


router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);

router.get('/products/:slug',getProductsBySlug);




// router.get('/category/getcategory',getCategories);


module.exports = router;
const express = require("express");
const router = express.Router();
const path = require('path');
const Product = require("../controllers/productController");

router.get('/mainpage',function(req,res)
{
    //Product.addProducts();
    res.sendFile(path.join(__dirname,'../views/public/mainPage.html'))
})




module.exports = router;
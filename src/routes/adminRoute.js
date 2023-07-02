const express = require("express");
const router = express.Router();
const path = require('path');
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/public/admin.html'));
});

router.post('/updateOrder', async function (req, res) {
    const { _id, created, confirmationStatus } = req.body;
    orderController.updateConfirmationStatus(_id, created, confirmationStatus);
});

router.get('/getAllOrders', async function (req, res) {
    const orders = await orderController.getAllOrders();
    res.status(200).json({ orders });
});

router.get('/getAllProducts', async function (req, res) {
    const products = await productController.getAllProducts();
    res.status(200).json({ products });
});

router.post('/removeProduct', async function (req, res) {
    const { _id } = req.body; 
    await productController.removeProduct(_id);
});

router.post('/updateProduct', async function (req, res) {
    const product = req.body; 
    await productController.updateProduct(product);
});

router.post('/addProducts' , async function (req,res){
    const products = req.body;
    await productController.addNewProducts(products);
});

module.exports = router;
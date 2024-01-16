const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkUser = require('../middleware/authCheck');
const checkFile = require('../middleware/filecheck');

router.get('/', productController.getAllProduct);

router.get('/product/:id', productController.getProductById);


router.post('/api/create-product', checkUser.adminCheck,
  checkFile.fileCheck, productController.createProduct);

router.post('/api/create-product', checkUser.adminCheck,
  checkFile.fileCheck, productController.createProduct);


router.patch('/api/update-product/:id', checkUser.adminCheck,
  checkFile.updateCheck, productController.updateProduct);


router.patch('/api/review-product/:id', checkUser.userCheck,
  checkFile.updateCheck, productController.addReview);


router.delete('/api/remove-product/:id', checkUser.adminCheck, productController.updateProduct);






module.exports = router;


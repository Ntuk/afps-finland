const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/auth');
const ProductCtrl = require('../controllers/product');

router.get('', ProductCtrl.getProducts);
router.get('/user-products',
          //  AuthCtrl.onlyAuthUser,
          //  AuthCtrl.onlyAdmin,
           ProductCtrl.getAdministratorProducts);
router.get('/:id', ProductCtrl.getProductById);
router.get('/s/:slug', ProductCtrl.getProductBySlug);

router.post('',
            AuthCtrl.onlyAuthUser,
            AuthCtrl.onlyAdmin,
            ProductCtrl.createProduct)
router.patch('/:id',
              AuthCtrl.onlyAuthUser,
              AuthCtrl.onlyAdmin,
              ProductCtrl.updateProduct)


module.exports = router;

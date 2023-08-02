const express = require('express');
const router = express.Router();

const api_cart = require('../controllers/api_cart_controller');

// user middlewares for auth user
const Purchases_JWT = require('../middlewares/purchases_JWT');

//api cart Crud
router.post('/post', Purchases_JWT, api_cart.post_cart);
router.get('/get', Purchases_JWT, api_cart.get_cart);
router.put('/put/:id', api_cart.put_cart);
router.delete('/delete/:id', api_cart.delete_cart);

router.delete('/clean', Purchases_JWT, api_cart.clean_cart);

module.exports = router;
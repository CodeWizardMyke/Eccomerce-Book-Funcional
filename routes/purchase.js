const express = require('express');
const router = express.Router();

const purchase_controller = require('../controllers/purchase_controller.js');

router.get('/cart', purchase_controller.get_cart_view);
router.get('/payment', purchase_controller.get_paymen_view);

module.exports = router;
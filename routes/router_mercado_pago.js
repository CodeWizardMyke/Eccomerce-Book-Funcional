const express = require('express');
const router = express.Router();

//importação do controler da api_sales
const mercado_pago_contoller = require('../controllers/api_mercado_pago');
const verifyJWT = require('../middlewares/verifyJWT.js');

//mercado pago api_sales
router.post('/post', verifyJWT, mercado_pago_contoller.post_preference);
router.get('/get', mercado_pago_contoller.get_preference);

module.exports = router;
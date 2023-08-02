const express = require('express');
const router = express.Router();

// import middleware auth user
const verifyJWT = require('../middlewares/verifyJWT');

//import controller
const purchases_controller = require('../controllers/api_purchases_controller');

router.get('/get', verifyJWT, purchases_controller.get);
router.get('/sales', verifyJWT, purchases_controller.get_sales);
router.get('/search', verifyJWT, purchases_controller.search_sales);
router.get('/show', verifyJWT, purchases_controller.get_all_info);

module.exports = router;

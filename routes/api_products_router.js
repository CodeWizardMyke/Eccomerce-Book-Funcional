const express = require('express');
const router = express.Router();

//controllers is used
const api_products = require('../controllers/api_products_controller');
const api_products_score = require('../controllers/api_product_score_controller');

//middlewareds required
const check = require('../middlewares/check_fields');
const upload = require('../middlewares/upload-img-book');
const verifyJWT = require('../middlewares/verifyJWT');
const JWT_admin = require('../middlewares/JWT_admin');

//crud products
router.get('/get', api_products.get_all_prod);
router.get('/get/:id', api_products.get_prod);

router.post('/post', upload.single('front_cover'), verifyJWT, check.Book_fields, api_products.post_prod);
router.put('/put/:id', upload.single('front_cover'), verifyJWT, check.check_img, api_products.put_prod);
router.delete('/delete/:id', verifyJWT, api_products.delete_prod);

router.get('/carousel', api_products.get_prod_carousel);
router.get('/search', JWT_admin, api_products.prod_search);

//secound Controller use
router.get('/bestsaler', api_products_score.get_bestsaler);
router.get('/indication', api_products_score.get_indication);

module.exports = router;
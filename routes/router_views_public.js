const express = require('express');
const router = express.Router();

// importação dos controllers
const views_controller = require('../controllers/views_public_controller');

//middlewares import
const score = require('../middlewares/score_book');

router.get('/:id?', views_controller.index);
router.get('/search/:search?', views_controller.search);
router.get('/product/:id', score, views_controller.produto);
router.get('/products/library', views_controller.library);
router.get('/products/bestsaler',views_controller.bestsaler);
router.get('/products/indication',views_controller.indication);

router.get('/ticket/feedback', views_controller.feedback);
router.post('/ticket/feedback', views_controller.feedback_post);

module.exports = router;
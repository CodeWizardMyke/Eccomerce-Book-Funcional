const express = require('express');
const router = express.Router();

// importação dos controllers
const views_manager_admin = require('../controllers/views_manager_admin')

router.get('/', views_manager_admin.index);

//manager products
router.get('/prod/create', views_manager_admin.createProd);
router.get('/prod/search', views_manager_admin.searchProd);
router.get('/prod/:id', views_manager_admin.putProd);

// manager users
router.get('/user/create', views_manager_admin.createUser);
router.get('/user/search', views_manager_admin.searchUser);
router.get('/user/:id', views_manager_admin.showUser);

//manager sales
router.get('/sales', views_manager_admin.salesGet);
router.get('/sales/search', views_manager_admin.salesSearch);
router.get('/sales/show/:id', views_manager_admin.salesShow);

router.get('/feedbacks', views_manager_admin.feedbacks);
router.get('/feedback/show/:id', views_manager_admin.feedback_show);

module.exports = router;
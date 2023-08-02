const express = require('express');
const router = express.Router();

// importação dos controllers
const views_private = require('../controllers/views_user_profile');

router.get('/profile', views_private.user_profile);
router.get('/information', views_private.user_information);

module.exports = router;
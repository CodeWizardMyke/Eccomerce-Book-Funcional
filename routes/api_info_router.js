const express = require('express');
const router = express.Router();

const api_info_controller = require('../controllers/api_info_controller');

// user middlewares for auth user
const verifyJWT = require('../middlewares/verifyJWT');
const check = require('../middlewares/check_fields');

//information data insert or consulting
router.post('/post', verifyJWT, check.Info_fields, api_info_controller.post_info);
router.get('/get', verifyJWT, api_info_controller.get_info);
router.put('/put', verifyJWT, api_info_controller.put_info);
router.delete('/delete', verifyJWT, api_info_controller.delete_info);

module.exports = router;
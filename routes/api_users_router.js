const express = require('express');
const router = express.Router();

const api_users_controller = require('../controllers/api_users_controller');

// user middlewares for auth user
const verifyJWT = require('../middlewares/verifyJWT');
const check = require('../middlewares/check_fields');
const upload = require('../middlewares/upload-avatar');

//api crud users 
router.get('/get/:id', verifyJWT, api_users_controller.userGetById);
router.post('/post', verifyJWT, check.singUp, api_users_controller.post_user);
router.put('/put/:id', upload.single('avatar_user'), check.check_avatar, verifyJWT, api_users_controller.put_user);
router.delete('/delete/:id', verifyJWT, api_users_controller.delete_user);

router.get('/search/', verifyJWT, api_users_controller.get_user);
router.put('/form/put', upload.single('avatar_user'), verifyJWT, check.User_modify, api_users_controller.fomr_put);
router.get('/auth', verifyJWT, api_users_controller.auth);

module.exports = router;
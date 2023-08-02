const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/usersAuth_controller');

// middlewares required's important! //
const validation = require('../middlewares/check_fields');
const upload = require('../middlewares/upload-avatar');

// validation for fields on method post //
const signUp_check = require('../middlewares/singup_check');
const login_check = require('../middlewares/login_check');
const verifyJWT = require('../middlewares/verifyJWT.js');

router.get('/sign', auth_controller.view_signUp);
router.post('/sign', upload.single('avatar'), validation.singUp, signUp_check, auth_controller.signUp);
router.get('/login', auth_controller.view_login);
router.post('/login', validation.login, login_check, auth_controller.login);
router.post('/logout', verifyJWT, auth_controller.logout);

module.exports = router;
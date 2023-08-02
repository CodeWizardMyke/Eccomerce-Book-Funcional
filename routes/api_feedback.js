const express = require('express');
const router = express.Router();

//controller is required:
const apiController = require('../controllers/api_feedback');

//middleware is required:
const jwt = require('../middlewares/verifyJWT');

router.get('/get', apiController.get);
router.get('/get/:id', apiController.get_id);
router.put('/put/:id',  apiController.put);

module.exports = router;
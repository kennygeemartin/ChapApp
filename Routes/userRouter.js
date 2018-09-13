var express = require('express');
var router = express.Router();
var userController = require('../Controllers/userController');
// var uploadService = require('../Uploads/userUploads/uploadService');

/* GET users listing. */
router.get('/', userController.getAll); //adminprotected

router.get('/search/:id', userController.getById); //adminprotected

//login/admin protected
router.delete('/delete/:id', userController.delete);

//adminprotected
router.get('/search', userController.search);

router.post('/signup', userController.createAccount);

router.post('/login', userController.login);

router.post('/update/:id', userController.update);

module.exports = router;
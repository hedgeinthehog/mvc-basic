const express = require('express');
const router = express.Router();

const usersController = require('../../controllers/UsersController');
const authenticateToken = require('../../middlewares/authenticateToken');

router.get('/signup', usersController.renderForm)
  .post('/signup', usersController.signup);
router.get('/login', usersController.renderForm)
  .post('/login', usersController.login);
router.get('/current', authenticateToken, usersController.getCurrent)

module.exports = router;
const express = require('express');
const authController = require('./auth.controller');
const authRouter = express.Router();

authRouter.post('/login', authController.loginController);
authRouter.post('/register', authController.signupController);

module.exports = authRouter;
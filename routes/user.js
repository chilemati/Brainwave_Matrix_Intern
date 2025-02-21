const express = require('express');
const { user_get, user_signup, user_login, user_patch, user_delete, user_single } = require('../controllers/user');
const { validateUser } = require('../validator/validateUser');

const userRouter = express.Router();

userRouter.get('/users',user_get);
userRouter.post('/signup',validateUser,user_signup);
userRouter.post('/login',user_login);
userRouter.patch('/users',user_patch);
userRouter.delete('/users',user_delete);
userRouter.get('/users/:id',user_single);


module.exports= userRouter;
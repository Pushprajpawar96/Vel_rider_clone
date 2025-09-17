const {Router} = require('express');
const AuthRoutes = require('./Auth/AuthRoutes');
const { CommonRoutes } = require('./Common/CommonRoutes');
const Routes = Router();

Routes.use('/auth', AuthRoutes);
Routes.use('/common', CommonRoutes);



module.exports = Routes;

const {Router} = require("express");
const { UserRegister, LoginUser } = require("../../Controllers/Auth/Auth.controller");

const AuthRoutes = Router();


AuthRoutes.post('/register', UserRegister);
AuthRoutes.post('/login', LoginUser);



module.exports = AuthRoutes;
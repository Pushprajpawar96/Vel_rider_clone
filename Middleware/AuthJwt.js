const { expressjwt: expressJwt } = require('express-jwt');
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require('../config');
const { ErrorHandler, ResponseOk } = require('../Utils/ResponseHandler');
const db = require('../Models/Config/db.config');
const { sendToken } = require('../Utils/TokenUtils');


const User = db.user;

function authJwt() {
  console.log("secret",ACCESS_TOKEN_KEY)
  return async (req, res, next) => {
    const middleware = expressJwt({
      secret: "fuyfvv4324@#t23tc256d23fud2356d23df235d3",
      algorithms: ['HS256'],
      requestProperty: 'auth'
    }).unless({
      path: [
        // public or auth routes
        '/api/v1/auth/login',
        '/api/v1/auth/register'
      ]
    });

    await middleware(req, res, async (err) => {
      if (err) {
        const refreshToken = req.headers.refreshtoken;
        if (refreshToken) {
          try {
            const decoded = jwt.verify(refreshToken.replace('Bearer ', ''), REFRESH_TOKEN_KEY);
            const user = await User.findOne({ where: { id: decoded.id } });
            if (!user) return ErrorHandler(res, 401, 'Unauthorized user');

            const newAccessToken = await sendToken({ id: user.id, email: user.email });
            res.setHeader('access_token', newAccessToken.token);
            req.auth = decoded;
            return next();
          } catch (e) {
            return ErrorHandler(res, 401, 'Invalid refresh token');
          }
        } else {
          return ErrorHandler(res, 401, 'Unauthorized request');
        }
      }
      next();
    });
  };
}

module.exports = { authJwt };

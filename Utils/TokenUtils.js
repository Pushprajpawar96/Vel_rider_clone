const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_KEY } = require('../config');
const db = require('../Models/Config/db.config');
const User = db.user;

const sendToken = async (user) => {
  const token = jwt.sign(user, ACCESS_TOKEN_KEY, {
    expiresIn: '1h',
  });
  console.log("token", token);
  return { token, expiresin: '1h' };
};

const sendRefreshToken = async (info, res) => {
  const { token: refresh_token, expiresIn } = await User.signRefreshToken(info);
  return { refresh_token, expiresIn };
};

module.exports = { sendToken,sendRefreshToken };

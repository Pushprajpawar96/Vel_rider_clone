const { ErrorHandler } = require("../Utils/ResponseHandler.js");

async function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return ErrorHandler(res,401,"Unauthorized  User");
  }
  if (err.name === "ValidationError") {
    return ErrorHandler(res, err);
  }
  return res.status(401).send({ status: 3, msg: err });
}


module.exports = errorHandler;

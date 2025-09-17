function ErrorHandler(res, statusCode, msg) {
    return res.status(statusCode).send({ status: 0, msg: msg });
  }
  function ResponseOk(res, statusCode, msg, data) {
    return res.status(statusCode).send({ status: 1, msg, data });
  }
  
  function ErrorHandlerDeactivate(res, statusCode, msg) {
    return res.status(statusCode).send({ status: 3, msg: msg });
  }
  
  function ResponseDone(res, statusCode, msg, data,count) {
    return res.status(statusCode).send({ status: 1, msg, data,count });
  }
  module.exports = {
    ErrorHandler,
    ResponseOk,
    ResponseDone,
    ErrorHandlerDeactivate
  };
  
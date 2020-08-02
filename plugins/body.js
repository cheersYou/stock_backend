const koaBody = require("koa-body");
module.exports = function() {
  return koaBody({
    multipart: true
  });
};

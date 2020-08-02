const static = require("koa-static");
module.exports = function(path) {
  return static(path);
};

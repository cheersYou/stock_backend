const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const commonUtils = require("../utils/common");
const router = new Router();
function initRouter(config) {
  if (commonUtils.isObject(config)) {
    fs.readdir(__dirname, function(err, files) {
      if (err) throw err;
      files.forEach(file => {
        let filepath = path.join(__dirname, file);
        fs.stat(filepath, function(err, info) {
          if (err) throw err;
          if (info.isDirectory()) {
            if (config[file] && !config[file].disabled) {
              const route = require(filepath);
              router
                .use(config[file].prefix || "/", route.routes())
                .use(route.allowedMethods());
            }
          }
        });
      });
    });
  }
}

module.exports = function(config) {
  initRouter(config);
  return router;
};

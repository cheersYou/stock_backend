const fs = require("fs");
const path = require("path");
const commonUtils = require("../utils/common");
const apis = [];
function initAPI(config) {
  if (commonUtils.isObject(config)) {
    fs.readdir(__dirname, function(err, files) {
      if (err) throw err;
      files.forEach(file => {
        let filepath = path.join(__dirname, file);
        fs.stat(filepath, function(err, info) {
          if (err) throw err;
          if (info.isDirectory()) {
            if (config[file] && !config[file].disabled) {
              const modules = require(filepath);
              apis.push(...modules);
            }
          }
        });
      });
    });
  }
}

module.exports = function(config) {
  initAPI(config);
  return apis;
};

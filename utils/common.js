const path = require("path");
const isObject = function(obj) {
  let type = typeof obj;
  return type === "function" || (type === "object" && !!obj);
};
const getRandomColor = () => {
  let r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return "rgb(" + [r, g, b].join(",") + ")";
};
const guid = () => {
  let d = new Date().getTime();
  let uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};
const cacheFn = function(func) {
  let map = new Map();
  return async function() {
    let result = null;
    if (map.get(func)) {
      result = map.get(func);
      return result;
    }
    result = await func(...arguments);
    map.set(func, result);
    return result;
  };
};
const resolvePath = (path1, path2) => {
  return path.resolve(path1, path2);
};
module.exports = {
  getRandomColor,
  isObject,
  cacheFn,
  guid,
  resolvePath
};

const cors = require("koa2-cors");
// let whitelist = [];
module.exports = function() {
  return cors({
    origin: function(ctx) {
      // return "http://localhost:8080";
      let url = ctx.header.origin;
      // if (whitelist.indexOf(url) < 0) {
      //   whitelist.push(url);
      // }
      return url;
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5, // 预检请求options时间
    credentials: true, // 允许浏览器发送cookies
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"], //设置允许的HTTP请求类型
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  });
};

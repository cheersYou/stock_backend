const session = require("koa-session");
module.exports = function(app) {
  return session(
    {
      key: "session-key", // session_name
      maxAge: 720000,
      overwrite: true,
      autoCommit: true,
      httpOnly: false,
      signed: false // 设置true需要设置app.keys
    },
    app
  );
};
// 会话 会话还需指定一个才可以使用
// app.use(async (ctx, next) => {
//   console.log("session");
//   if (ctx.path === "/favicon.ico") return;
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + " views";
//   await next();
// });

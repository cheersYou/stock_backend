module.exports = function() {
  return async ctx => {
    // name value
    ctx.cookies.set("cid", "hello wolrd", {
      domain: "192.168.0.15", // 写cookie所在的域名
      path: "/", // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date("2020-04-27"), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false //
    });
  };
};

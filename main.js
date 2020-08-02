const Koa = require("koa");
const config = require("config");
const path = require("path");
const koaBody = require("./plugins/body");
const history = require("./plugins/history");
const static = require("./plugins/static");
const session = require("./plugins/session");
const cors = require("./plugins/cors");
// const cookies = require("./plugins/cookies");
const Router = require("./route");
const routeConfig = require("./config/routes.json");
const commonUtils = require("./utils/common");
const app = new Koa();
// app.keys = ["secret key"];
const { PORT, STATICPATH } = config;
// 跨域 简单请求(直接请求)和非简单请求(需要先发送预检请求options查询服务器),注意放在最前面，不然容易出现问题
app.use(cors());
// 前端模式设置history,需要放在static前面
// app.use(
//   history({
//     verbose: true
//   })
// );
// 静态文件
app.use(static(path.join(__dirname, STATICPATH)));
// post请求支持multipart/form-data
app.use(koaBody());
// app.use(cookies());
// 会话 会话还需指定一个才可以使用
app.use(session(app));

const router = Router(routeConfig);
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);

console.log("start:localhost:" + PORT);

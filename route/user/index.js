const Router = require("koa-router");

const mongoUtils = require("../../utils/mongo");
const { guid, getRandomColor, resolvePath } = require("../../utils/common");
const Module = require("../../modal/user");
const Stock = require("../../modal/stock");
const Fund = require("../../modal/fund");
const { SUCCESS, FAILURE } = require("../types");
const fs = require("fs");
let router = new Router();

router.post("userLogin", async ctx => {
  const { name, password } = ctx.request.body;
  const User = Module.userLogin("Login");
  const userInfo = Module.userInfo("UserInfo");
  // find(sql,filtersql,options={limit:25,})
  try {
    const res = await User.findOne(
      {
        name: name,
        password: password
      },
      {
        code: 1,
        name: 1
      }
    );
    if (res && res.code) {
      const userinfo = await userInfo.findOne({
        code: res.code
      });
      ctx.session.user = res.name;
      let fundlist = [],
        stocklist = [];
      let {
        defaultFunds,
        defaultStocks,
        selfAddFunds,
        selfAddStocks,
        selfPortals
      } = userinfo;
      let fundlist_temp = defaultFunds.concat(selfAddFunds);
      let stocklist_temp = defaultStocks.concat(selfAddStocks);
      fundlist_temp.forEach(i => {
        fundlist.push({
          name: i,
          color: getRandomColor()
        });
      });
      stocklist_temp.forEach(i => {
        stocklist.push({
          name: i,
          color: getRandomColor()
        });
      });
      ctx.response.body = {
        status: "success",
        message: "登录成功！",
        userInfo: {
          fundlist: fundlist,
          stocklist: stocklist,
          portallist: selfPortals,
          code: userinfo.code
        }
      };
    } else {
      ctx.response.body = FAILURE;
    }
  } catch (e) {
    ctx.response.body = FAILURE;
    throw new Error(e);
  }
});
router.get("jsonp", async ctx => {
  let { callback } = ctx.request.query;
  let data = {
    status: "success",
    msg: "message"
  };
  // 不需要类型也可以
  // ctx.type = "text/javascript";
  // 返回值必须使用JSON.stringify()进行处理
  ctx.response.body = `;${callback}(${JSON.stringify(data)})`;
});

router.get("session", async ctx => {
  if (ctx.session.user) {
    ctx.response.redirect("/home");
  }
  ctx.session.user = "weicong";
  ctx.response.body = "session is setting";
});

router.post("userRegistry", async ctx => {
  const { name, password } = ctx.request.body;
  const User = Module.userLogin("Login");
  const res = await User.findOne({
    name: name,
    password: password
  });
  if (res) {
    ctx.response.body = {
      status: "failure",
      message: "您已经注册过，请直接登录"
    };
  } else {
    const User = Module.userRegistry("Login");
    const UserInfo = Module.userInfo("UserInfo");
    let stocklist = await Stock.getAllStocksList();
    let fundlist = await Fund.getAllFundsList();
    const code = guid();
    let userInfo = new UserInfo({
      code: code,
      defaultFunds: fundlist,
      defaultStocks: stocklist,
      selfAddFunds: [],
      selfAddStocks: [],
      selfPortals: []
    });
    let user = new User({
      name: name,
      password: password,
      code: code
    });
    await user.save();
    await userInfo.save();
    ctx.response.body = {
      status: "success",
      message: "注册成功！"
    };
  }
});
router.get("userInfo", async ctx => {
  let code = ctx.cookies.get("userCode");
  if (code) {
    const userInfo = Module.userInfo("UserInfo");
    const userinfo = await userInfo.findOne({
      code: code
    });
    if (userinfo) {
      let fundlist = [],
        stocklist = [];
      let {
        defaultFunds,
        defaultStocks,
        selfAddFunds,
        selfAddStocks,
        selfPortals
      } = userinfo;
      let fundlist_temp = defaultFunds.concat(selfAddFunds);
      let stocklist_temp = defaultStocks.concat(selfAddStocks);
      fundlist_temp.forEach(i => {
        fundlist.push({
          name: i,
          color: getRandomColor()
        });
      });
      stocklist_temp.forEach(i => {
        stocklist.push({
          name: i,
          color: getRandomColor()
        });
      });
      ctx.response.body = {
        status: "success",
        userInfo: {
          fundlist: fundlist,
          stocklist: stocklist,
          portallist: selfPortals,
          code: userinfo.code
        }
      };
    } else {
      ctx.response.body = FAILURE;
    }
  }
});
router.post("addFundOrStock", async ctx => {
  let { type, value } = ctx.request.body;
  let code = ctx.cookies.get("userCode");
  const userInfo = Module.userInfo("UserInfo");
  let data = (value.code ? value.code + "," : "") + value.name;
  let path = resolvePath(__dirname, "../../");
  if (code) {
    try {
      if (type && type === "基金") {
        fs.writeFile(path + "\\fund.txt", data, function(err) {
          if (err) {
            return console.error(err);
          }
        });
        await userInfo.updateOne(
          { code: code },
          { $addToSet: { selfAddFunds: value.name } }
        );
      } else {
        fs.writeFile(path + "\\stock.txt", data, function(err) {
          if (err) {
            return console.error(err);
          }
        });
        await userInfo.updateOne(
          { code: code },
          { $addToSet: { selfAddStocks: value.name } }
        );
      }
    } catch (e) {
      throw new Error(e);
    }
    ctx.response.body = {
      status: "success",
      message: "添加成功！"
    };
  } else {
    ctx.response.body = FAILURE;
  }
});
router.post("removeFundOrStock", async ctx => {
  let { name, type } = ctx.response.body;
  let userInfo = Module.userInfo("UserInfo");
  let code = ctx.cookies.get("userCode");
  if (code) {
    try {
      if (type === "基金") {
        await userInfo.updateOne(
          { code: code },
          { $pull: { selfAddFunds: { name: name } } }
        );
      } else if (type == "股票") {
        await userInfo.updateOne(
          { code: code },
          { $pull: { selfAddStocks: { name: name } } }
        );
      }
      ctx.response.body = {
        status: "success",
        message: "删除成功！"
      };
    } catch (e) {
      ctx.response.body = FAILURE;
      throw new Error(e);
    }
  }
});
router.post("addPortal", async ctx => {
  let { name, link, color } = ctx.request.body;
  let code = ctx.cookies.get("userCode");
  const userInfo = Module.userInfo("UserInfo");
  let sql = {
    name: name,
    link: link,
    color: color
  };
  if (code && name && link && color) {
    try {
      await userInfo.updateOne(
        { code: code },
        { $addToSet: { selfPortals: sql } }
      );
    } catch (e) {
      throw new Error(e);
    }
    ctx.response.body = {
      status: "success",
      message: "注册成功！"
    };
  } else {
    ctx.response.body = FAILURE;
  }
});
router.post("userLayout", async ctx => {
  ctx.session = null;
  ctx.response.body = {
    status: "success",
    message: "登出成功！"
  };
});

router.post("saveNaicha", async ctx => {
  let { name, list } = ctx.request.body;
  // 创建一个集合
  const NaiCha = Module.naiCha("Naicha");
  let code = ctx.cookies.get("userCode");
  let sql = {
    name: name,
    color: getRandomColor(),
    list: list
  };
  let sql_create = {
    code: code,
    results: [sql]
  };

  if (code) {
    let res = await NaiCha.findOne({ code: code });
    if (res) {
      await NaiCha.updateOne(
        { code: code },
        {
          $addToSet: { results: sql }
        }
      );
    } else {
      let naicha = new NaiCha(sql_create);
      await naicha.save();
    }
    ctx.response.body = {
      status: "success",
      message: "更新成功！"
    };
  } else {
    ctx.response.body = FAILURE;
  }
});

router.post("getNaicha", async ctx => {
  let code = ctx.cookies.get("userCode");
  if (code) {
    const naicha = Module.naiCha("Naicha");
    let res = await naicha.findOne({ code: code });
    if (res) {
      let { results } = res;
      ctx.response.body = {
        status: "success",
        list: results
      };
    } else {
      ctx.response.body = FAILURE;
    }
  }
});
module.exports = router;

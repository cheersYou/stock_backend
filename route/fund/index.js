const Router = require("koa-router");
const mongoUtils = require("../../utils/mongo");
const Module = require("../../modal/fund");
let router = new Router();

function process(func, options) {
  const { limit, limitNum, sort, sortSql } = options;
  let res = func;
  if (limit && limitNum) {
    res = func.limit(limitNum);
  }
  if (sort && sortSql) {
    res = res.sort(sortSql);
  }
  return res;
}
router.get("fundlist", async ctx => {
  let params = ctx.request.query; // queryString
  let StockList = Module.getFundList("美的电器");
  const res = await StockList.find({});
  ctx.response.body = res;
});

router.get("fundtables", async ctx => {
  let list = await Module.getAllFundsList();
  let res = {
    type: "fund",
    list: list || []
  };
  ctx.response.body = res;
});

module.exports = router;

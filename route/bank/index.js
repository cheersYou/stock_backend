const Router = require("koa-router");
const mongoUtils = require("../../utils/mongo");
const { getRandomColor } = require("../../utils/common");
const Concept = require("../../modal/concept");
const Industry = require("../../modal/industry");
let router = new Router();
// 获取所有概念板块的每日优质股票
router.get("conceptlist", async ctx => {
  let list = await Concept.getConceptByName();
  let res = [];
  for (let i in list) {
    let ConceptList = Concept.getConceptList(list[i]);
    const result = await ConceptList.find({});
    res.push({
      name: list[i],
      list: result
    });
  }
  ctx.response.body = res;
});
// 获取所有行业板块的每日优质股票
router.get("industrylist", async ctx => {
  let list = await Industry.getIndustryByName();
  let res = [];
  for (let i in list) {
    let IndustryList = Industry.getIndustryList(list[i]);
    const result = await IndustryList.find({});
    res.push({
      name: list[i],
      list: result
    });
  }
  ctx.response.body = res;
});
// 获取每日概念板块涨停排名股票
router.get("conceptListByDate", async ctx => {
  let list = await Concept.getConceptByDate();
  let res = [];
  for (let i in list) {
    let ConceptList = Concept.getConceptList(list[i]);
    const result = await ConceptList.find({});
    res.push({
      name: list[i],
      list: result
    });
  }
  ctx.response.body = res;
});
// 获取每日行业涨停排名股票
router.get("industryListByDate", async ctx => {
  let list = await Industry.getIndustryByDate();
  let res = [];
  for (let i in list) {
    let IndustryList = Industry.getIndustryList(list[i]);
    const result = await IndustryList.find({});
    res.push({
      name: list[i],
      list: result
    });
  }
  ctx.response.body = res;
});
// 根据行业名称获取相应行业板块股票
router.get("industryListByName", async ctx => {
  const { name } = ctx.request.query;
  let IndustryList = Industry.getIndustryList(name);
  const res = await IndustryList.find({});
  ctx.response.body = {
    name: name,
    list: res
  };
});
// 根据概念名称获取相应概念板块股票
router.get("conceptListByName", async ctx => {
  const { name } = ctx.request.query;
  let ConceptList = Concept.getConceptList(name);
  const res = await ConceptList.find({});
  ctx.response.body = {
    name: name,
    list: res
  };
});
// 获取概念涨停历史日期 -- 无用
router.get("getBankConceptDate", async ctx => {
  let list = await Concept.getConceptByDate();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "bank",
    list: temps || []
  };
  ctx.response.body = res;
});
// 获取行业涨停历史日期 -- 无用
router.get("getBankIndustryDate", async ctx => {
  let list = await Industry.getIndustryByDate();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "bank",
    list: temps || []
  };
  ctx.response.body = res;
});
// 获取所有概念板块名称
router.get("getBankConceptName", async ctx => {
  let list = await Concept.getConceptByName();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "bank",
    list: temps || []
  };
  ctx.response.body = res;
});
// 获取所有行业板块名称
router.get("getBankIndustryName", async ctx => {
  let list = await Industry.getIndustryByName();
  let temps = [];
  list.forEach(i => {
    temps.push({
      name: i,
      color: getRandomColor()
    });
  });
  let res = {
    type: "bank",
    list: temps || []
  };
  ctx.response.body = res;
});
module.exports = router;

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
var DemoController_exports = {};
__export(DemoController_exports, {
  TestController: () => TestController
});
module.exports = __toCommonJS(DemoController_exports);
var import_xiao_koa = require("xiao-koa");
let TestController = class {
  get() {
    return { msg: "\u8FD9\u662FGet\u8BF7\u6C42" };
  }
  post() {
    return { msg: "\u8FD9\u662FPost\u8BF7\u6C42" };
  }
  request() {
    return { msg: "\u8FD9\u662FRequestMapping\u8BF7\u6C42" };
  }
  pathVariable(userId) {
    return { msg: "\u6F14\u793APathVariable", userId };
  }
  requestBody(user) {
    return { msg: "\u6F14\u793ARequestBody", user };
  }
  requestHeader(tokenCode) {
    return { msg: "\u6F14\u793ARequestBody", tokenCode };
  }
  autowired() {
    this.demoService.console();
    return { msg: "\u6F14\u793Aautowired" };
  }
  async mysql() {
    const userData = await this.demoMapping.findUser(1);
    return { msg: "\u6F14\u793Aautowired", userData };
  }
  async pressure() {
    return {
      code: "200",
      msg: "\u625B\u5F97\u4F4F\u538B\u529B\u5417"
    };
  }
};
__decorateClass([
  import_xiao_koa.Autowired
], TestController.prototype, "demoService", 2);
__decorateClass([
  import_xiao_koa.Autowired
], TestController.prototype, "demoMapping", 2);
__decorateClass([
  (0, import_xiao_koa.Get)("/get")
], TestController.prototype, "get", 1);
__decorateClass([
  (0, import_xiao_koa.Post)("/post")
], TestController.prototype, "post", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/request")
], TestController.prototype, "request", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/request/:id"),
  __decorateParam(0, (0, import_xiao_koa.PathVariable)("id"))
], TestController.prototype, "pathVariable", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/requestBody"),
  __decorateParam(0, import_xiao_koa.RequestBody)
], TestController.prototype, "requestBody", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/requestHeader"),
  __decorateParam(0, (0, import_xiao_koa.RequestHeader)("token"))
], TestController.prototype, "requestHeader", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/autowired")
], TestController.prototype, "autowired", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/mysql")
], TestController.prototype, "mysql", 1);
__decorateClass([
  (0, import_xiao_koa.RequestMapping)("/pressure")
], TestController.prototype, "pressure", 1);
TestController = __decorateClass([
  (0, import_xiao_koa.Controller)("/demo")
], TestController);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TestController
});

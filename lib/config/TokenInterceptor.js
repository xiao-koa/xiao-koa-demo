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
var TokenInterceptor_exports = {};
__export(TokenInterceptor_exports, {
  default: () => TokenInterceptor
});
module.exports = __toCommonJS(TokenInterceptor_exports);
var import_xiao_koa = require("xiao-koa");
let TokenInterceptor = class {
  async preHandle(ctx, next) {
    if (ctx.request.header["token"]) {
      await next();
    } else {
      throw { code: 403, error: "\u6CA1\u6709token" };
    }
  }
};
TokenInterceptor = __decorateClass([
  (0, import_xiao_koa.Service)()
], TokenInterceptor);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

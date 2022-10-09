import { Service, HandlerInterceptor } from 'xiao-koa'

@Service()
export default class TokenInterceptor implements HandlerInterceptor {
  async preHandle(ctx: any, next: any) {
    if (ctx.request.header['token']) {
      await next()
    } else {
      throw { code: 403, error: '没有token' }
    }
  }
}

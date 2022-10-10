import { Service, HandlerInterceptor, DefaultContext, DefaultState, Next, ParameterizedContext } from 'xiao-koa'

@Service()
export default class TokenInterceptor implements HandlerInterceptor {
  async preHandle(ctx: ParameterizedContext<DefaultState, DefaultContext, unknown>, next: Next) {
    if (ctx.request.header['token']) {
      await next()
    } else {
      throw { code: 403, error: '没有token' }
    }
  }
}

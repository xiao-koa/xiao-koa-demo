import { Service, HandlerInterceptor } from 'xiao-koa'

@Service()
export default class TokenInterceptor implements HandlerInterceptor {
  async preHandle(request: any, response: any, next: any) {
    if (request.header['token']) {
      await next()
    } else {
      throw { code: 403, error: '没有token' }
    }
  }
}

import { Configuration, Autowired, WebMvcConfigurer } from 'xiao-koa'

import TokenInterceptor from './TokenInterceptor'

@Configuration
export default class WebConfig2 implements WebMvcConfigurer {
  @Autowired
  declare tokenInterceptor: TokenInterceptor

  addInterceptors(registry: any) {
    // registry.addInterceptor(this.tokenInterceptor);
  }
}

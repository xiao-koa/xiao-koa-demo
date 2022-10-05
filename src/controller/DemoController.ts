import { Autowired, Controller, Get, PathVariable, Post, RequestBody, RequestHeader, RequestMapping } from 'xiao-koa'
import { DemoMapping } from '../mapping/DemoMapping'
import { DemoService } from '../service/DemoService'

@Controller('/demo')
export class TestController {
  @Autowired
  declare demoService: DemoService

  @Autowired
  declare demoMapping: DemoMapping

  @Get('/get')
  get() {
    return { msg: '这是Get请求' }
  }

  @Post('/post')
  post() {
    return { msg: '这是Post请求' }
  }

  @RequestMapping('/request')
  request() {
    return { msg: '这是RequestMapping请求' }
  }

  @RequestMapping('/request/:id')
  pathVariable(@PathVariable('id') userId: any) {
    return { msg: '演示PathVariable', userId }
  }

  @RequestMapping('/requestBody')
  requestBody(@RequestBody user: any) {
    return { msg: '演示RequestBody', user }
  }

  @RequestMapping('/requestHeader')
  requestHeader(@RequestHeader('token') tokenCode: string) {
    return { msg: '演示RequestBody', tokenCode }
  }

  @RequestMapping('/autowired')
  autowired() {
    this.demoService.console()
    return { msg: '演示autowired' }
  }

  @RequestMapping('/mysql')
  async mysql() {
    const userData = await this.demoMapping.findUser(1)
    return { msg: '演示autowired', userData }
  }

  @RequestMapping('/pressure')
  async pressure() {
    return {
      code: '200',
      msg: '扛得住压力吗',
    }
  }
}

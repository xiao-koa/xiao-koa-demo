import { Service } from 'xiao-koa'

@Service()
export class DemoService {
  console() {
    console.log('Hello World')
  }
}

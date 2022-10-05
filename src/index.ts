import { Application, xiaoKoaApp } from 'xiao-koa'
import xiaoKoaMysql from "xiao-koa-mysql";

@Application
export default class DemoApplication {
  main(app: xiaoKoaApp) {
    app.mount(xiaoKoaMysql);
    
    app.run(__dirname)
  }
}

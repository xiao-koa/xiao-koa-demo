import { Mapping, Sql } from 'xiao-koa-mysql'

@Mapping()
export class DemoMapping {
  @Sql(`select * from user where id = #{id}`)
  findUser(id: number): any {}

  @Sql('delete from user where id = #{id}')
  deleteUser(id: number): any {}
}

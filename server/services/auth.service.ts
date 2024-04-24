import { DB } from "@server/utils/DB";
import { Password } from "@server/utils/hash";

export class AuthService {

  static async Login( data: { username:string, password:string }) : Promise< DB.User | undefined >{

    const checkData = await DB('users').where('email' , data.username ).first()

    if( !checkData || !Password.comparePassword( checkData.password || '' , data.password ) )
      return undefined
    
    return checkData
  }

  static async CreateAuthSession( data: DB.LogSession ){
    return await DB('logs.session').insert(data)
  }

  static async isLoggedIn( cookie: string ): Promise<boolean>{
    const checkData = await DB('logs.session').select('user_id','api_key').where('api_key' , cookie ).first()
    if(!checkData)return false

    return typeof checkData.user_id !== 'undefined'
  }
}
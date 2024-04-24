import { AuthService } from '@server/services/auth.service'
import { UUID } from '@server/utils/hash'
import { ApiResponse, MyException, Yup } from '@server/utils/helpers'
import { LogFile } from '@server/utils/logfile'
import express from 'express'

const routers = express.Router()

routers.post('/', async function( req , res ){
  const response = ApiResponse({ data: req.body , code: 200 })

  try{
    const dataRequest = req.body
    const validationRules = {
      username: Yup.string().email().required() ,
      password: Yup.string().max(77).required() ,
    }
    const validation = Yup.object().shape(validationRules)
    const validationResult = await validation.validate(dataRequest).catch( LogFile.throwBack )

    const authResult = await AuthService.Login(validationResult)

    if( !authResult )
      throw new MyException('Invalid Username & Password' , 400 )

    const cookieValue = UUID()
    const expiredAt = new Date()
    expiredAt.setHours( expiredAt.getHours() + 23 )

    res.cookie('testApp' , cookieValue , { expires: expiredAt })
    await AuthService.CreateAuthSession({
      user_id: Number( authResult.id || 0 ),
      api_key: cookieValue ,
      extra_data: {},
      expired_at: expiredAt ,
    })

    response.message = 'Anda Berhasil Login'


  }catch(error){
    response.code = 400
    response.message = `${ error }`
    response.status = 'error'

    if( error instanceof MyException ){
      response.code = error.statusCode
    }
  }

  res.status(response.code).json(response)
})

export default routers
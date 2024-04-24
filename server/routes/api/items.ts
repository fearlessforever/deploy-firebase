import { AuthService } from '@server/services/auth.service'
import { DataTable } from '@server/utils/DataTable'
import { DB } from '@server/utils/DB'
import { UUID } from '@server/utils/hash'
import { ApiResponse, delay, MyException, Yup } from '@server/utils/helpers'
import { LogFile } from '@server/utils/logfile'
import express from 'express'

const routers = express.Router()

routers.post('/', async function( req , res ){
  const response = ApiResponse({ data: req.body , code: 200 })

  await delay(1000)

  try{
    const dataRequest = req.body
    const validationRules = {
      title: Yup.string().max(227).required() ,
      content: Yup.string().max(2727).required() ,
    }
    const validation = Yup.object().shape(validationRules)
    const validationResult = await validation.validate(dataRequest).catch( LogFile.throwBack )

    await DB('items').insert(validationResult)
      

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

routers.get('/' , async function( req , res ){

  const requestParams = Object.assign({} , req.query, req.params , req.body )

  // LogFile(requestParams)
  const queryTableItems = DB('items')

  if(requestParams.search){
    queryTableItems.where('title','ILIKE',`%${requestParams.search}%`)
                   .orWhere('content','ILIKE',`%${requestParams.search}%`)
  }
  const currentTableInstance = new DataTable(queryTableItems , requestParams )

  currentTableInstance.mappingColumnsToTableFields = {
    id:'id',
    content:'content',
    title:'title',
  }

  currentTableInstance.whiteListColumnsOrder = [
    'id','title','created_at'
  ]

  const response = await currentTableInstance.get()

  res.json(response)
})

export default routers
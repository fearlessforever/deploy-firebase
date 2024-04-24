import express from 'express'
import AuthRoutes from '@server/routes/api/auth'
import ItemsRoutes from '@server/routes/api/items'
import { ApiResponse } from '@server/utils/helpers'

const routers = express.Router()

routers.use( express.json() )

routers.use('/auth', AuthRoutes )
routers.use('/items', ItemsRoutes )

routers.all('*', function( req , res ){

  const response = ApiResponse({ data:[], code:404 })
  response.message = 'Rute not Found'

  res.status(response.code).json(response)
})

export default routers
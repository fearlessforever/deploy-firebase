import express from 'express'

const routers = express.Router()

routers.get('/', function( req , res ){

  // res.json({})
  res.render('loginV1')
})

export default routers
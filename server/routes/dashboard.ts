import { AuthService } from '@server/services/auth.service'
import { LogFile } from '@server/utils/logfile'
import express from 'express'

const routers = express.Router()

routers.get('/', async function( req , res ){

  // console.log(req.cookies , req.signedCookies )
  const acceptedCookieValue = req.cookies.testApp || ''

  const isLoggedIn = await AuthService.isLoggedIn( acceptedCookieValue )
  if(!isLoggedIn){
    res.redirect('/')
    return
  }

  // res.json({})
  res.render('dashboard')
})

export default routers
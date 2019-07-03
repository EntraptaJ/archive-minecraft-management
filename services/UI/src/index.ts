import express from 'express'
import cookiesMiddleware from 'universal-cookie-express'

import { hotUiServer } from './UIMiddleware'

const StartServer = async () => {
  const app = express()

  app.use(cookiesMiddleware())
  app.use(express.static('dist/public'))
  app.use(hotUiServer)
  app.listen(80, () => console.log('http://localhost:81'))
}

StartServer()
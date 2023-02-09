import express from "express"
import { AppDataSource } from "./data-source"

var cors = require('cors')


AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  app.use(cors())


  app.get('/test', (req, res, next) => {
    res.send("<h1>Olá Mundo</h1>")
  })


  return app.listen(3000, () => { console.log('https://localhost:3000') })


})


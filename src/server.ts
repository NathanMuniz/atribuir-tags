import { AppDataSource } from "./data-source"
import { router } from "./routes";
import express, { Request, Response, NextFunction, response } from "express"
import "express-async-errors"

var cors = require('cors')


AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  app.use(cors())


  app.use(router)

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          error: err.message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  );


  return app.listen(3000, () => { console.log('https://localhost:3000') })


})


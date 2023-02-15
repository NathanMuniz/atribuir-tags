// import "express-async-errors"

interface Error {
  status: string
  leval: number
}

let err: Error = new Error()

err.name = "test"
err.leval = 5

function tesError(err: Error) {
  if (err instanceof Error) {
    console.log("It is", err)
  } else {
    console.log("It Not", err)
  }
}




tesError(err)







import express from "express"

process.env.NODE_ENV = "production"

const app = express();


const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
}

app.use(express.json())

app.get('/', (req, res, next) => {
  setTimeout(function() {
    try {
      throw new Error("There is an Error!");
    } catch (err) {
      next(err);
    }
  }, 100)
});

app.use(errorHandling)


app.listen(3000, () => {
  console.log("server is runnig on: localhost:3000 ")
})



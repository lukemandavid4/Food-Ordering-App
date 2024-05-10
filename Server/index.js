const express = require(`express`)
const cors = require(`express`)
const connectDB = require(`./config/config.js`)
const authRouter = require(`./routes/authRoute.js`)
const userRoute = require("./routes/userRoute.js")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(`/api/food`, authRouter)
app.use(`/api/user`, userRoute)
app.use(`/images`, express.static(`uploads`))

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Listening on port ${port}...`)
})
connectDB()
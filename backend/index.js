const express = require('express')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const cors = require('cors')

dotenv.config();

const app = express()

const authRouter = require('./src/routes/auth')
const productRouter = require('./src/routes/product')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB();

app.use('/api/user',authRouter)
app.use('/api/product',productRouter);

app.listen(process.env.PORT,() => {
    console.log(`server is listening on port ${process.env.PORT}`)
})
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routers/user.routers'
import prismaService from './services/prisma.services'
dotenv.config()

const app = express()
const port = 3000

app.use(
  cors({
    origin: process.env.FE_URL,
    credentials: true
  })
)

prismaService.connect()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`Project này đang chạy trên post ${port}`)
})

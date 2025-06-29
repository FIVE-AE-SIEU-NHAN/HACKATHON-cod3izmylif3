import express from 'express'
import { CVController, JDController, loginController, registerController } from '~/controller/user.controllers'
import CVRepository from '~/repositories/cv.repositories'
import { wrapAsync } from '~/utils/handler'

const userRouter = express.Router()

// login
userRouter.post('/login', wrapAsync(loginController))

// register
userRouter.post('/register', wrapAsync(registerController))

userRouter.post('/cv', wrapAsync(CVController))

userRouter.get('/jd', wrapAsync(JDController))

userRouter.get('/test', async (req, res) => {
  const repo = new CVRepository()
  const rs = await repo.getAllCVs()
  res.status(200).json({
    message: 'Test route is working',
    data: rs
  })
})

export default userRouter

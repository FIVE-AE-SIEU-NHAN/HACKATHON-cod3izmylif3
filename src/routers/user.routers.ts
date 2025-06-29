import express from 'express'
import { loginController, registerController } from '~/controller/user.controllers'
import { wrapAsync } from '~/utils/handler'

const userRouter = express.Router()

// register
userRouter.post('/register', wrapAsync(registerController))

// login
userRouter.post('/login', wrapAsync(loginController))

export default userRouter

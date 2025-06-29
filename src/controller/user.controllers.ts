import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constant/httpStatus'
import usersServices from '~/services/user.services'
import { ErrorWithStatus } from '~/utils/error'
import { verifyGoogleToken } from '~/utils/google'

interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
  gender: string
  phone_number: string
  google_id?: string
}

export interface LoginGoogleReqBody {
  id_token: string
}

export interface RegisterCVReqBody {
  user_id: string
  skills: string
  projects: string
  experience: string
  education: string
}

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  const result = await usersServices.login({ email, password })

  res.status(HTTP_STATUS.OK).json({
    message: 'Login successful',
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const checkResult = await usersServices.checkEmailExist(req.body.email)

  // Nếu chưa có tài khoản → đăng ký mới
  if (!checkResult || !checkResult.haveAccount) {
    const result = await usersServices.register(req.body)
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Registration successful',
      result
    })
    return
  }

  const { havePassword } = checkResult

  // Nếu có tài khoản nhưng chưa có password → update password
  if (!havePassword) {
    const result = await usersServices.updateUserByEmail(req.body.email, req.body)
    res.status(HTTP_STATUS.OK).json({
      message: 'Password updated successfully',
      result
    })
    return
  }

  // Nếu đã có tài khoản và đã có password → báo lỗi
  throw new ErrorWithStatus({
    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    message: 'Email already exists'
  })
}

export const loginGoogleController = async (
  req: Request<ParamsDictionary, any, LoginGoogleReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { id_token } = req.body

  const payload = await verifyGoogleToken(id_token)
  if (!payload) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: 'Invalid Google ID token'
    })
  }

  const { email, name, sub: google_id } = payload

  // Gọi service xử lý login bằng Google
  const { haveAccount, googleIDIsValid } = await usersServices.loginWithGoogleId(email, google_id)

  // Trường hợp: tài khoản chưa tồn tại → đăng ký mới
  if (!haveAccount) {
    const result = await usersServices.register({
      name,
      email,
      google_id,
      password: '',
      confirm_password: '',
      date_of_birth: '',
      gender: '',
      phone_number: ''
    })

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Registration successful'
    })
    return
  }

  // Trường hợp: tài khoản đã tồn tại và google_id đúng
  if (googleIDIsValid) {
    res.status(HTTP_STATUS.OK).json({
      message: 'Login successful'
    })
    return
  }

  // Trường hợp: tài khoản có nhưng google_id không đúng
  throw new ErrorWithStatus({
    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    message: 'Google ID is incorrect'
  })
}

export const CVController = async (
  req: Request<ParamsDictionary, any, RegisterCVReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id, skills, projects, experience, education } = req.body

  // Giả sử bạn có một hàm để lưu CV vào cơ sở dữ liệu
  const cvData = {
    user_id,
    skills,
    projects,
    experience,
    education
  }

  await usersServices.saveCVToDatabase(cvData)

  res.status(HTTP_STATUS.CREATED).json({
    message: 'CV created successfully',
    data: cvData
  })
}

export const JDController = async (
  req: Request<ParamsDictionary, any, RegisterCVReqBody>,
  res: Response,
  next: NextFunction
) => {
  const jdData = await usersServices.getAllJDs()

  res.status(HTTP_STATUS.CREATED).json({
    message: 'JD retrieved successfully',
    data: jdData
  })
}

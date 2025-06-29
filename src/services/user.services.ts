import HTTP_STATUS from '~/constant/httpStatus'
import { RegisterCVReqBody } from '~/controller/user.controllers'
import CVRepository from '~/repositories/cv.repositories'
import JDRepository from '~/repositories/jd.repositories'
import UserRepository from '~/repositories/user.repositories'
import { ErrorWithStatus } from '~/utils/error'

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

class UsersServices {
  private userRepository: UserRepository
  private cvRepository: CVRepository
  private jdRepository: JDRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.cvRepository = new CVRepository()
    this.jdRepository = new JDRepository()
  }

  // 0: admin, 1: candidate, 2: employer
  async register(payload: RegisterReqBody) {
    const role = 1
    const user = await this.userRepository.createUser(
      {
        ...payload
      },
      role
    )
  }

  async checkEmailExist(email: string) {
    const user = await this.userRepository.checkEmailExist(email)

    // Trường hợp không có tài khoản
    if (!user) {
      return {
        haveAccount: false,
        havePassword: false
      }
    }

    // Trường hợp có tài khoản nhưng chưa có password (chỉ có Google ID)
    if (!user.password && user.google_id) {
      return {
        haveAccount: true,
        havePassword: false
      }
    }

    // Trường hợp có tài khoản và đã có password
    return {
      haveAccount: true,
      havePassword: true
    }
  }

  async updateUserByEmail(email: string, payload: RegisterReqBody) {
    await this.userRepository.updateUserHaveGoogleId(email, {
      ...payload
    })
  }

  async loginWithGoogleId(email: string, google_id: string) {
    // Tìm user bằng email
    const user = await this.userRepository.checkEmailExist(email)

    // CASE 1: Không tìm thấy tài khoản với email này
    if (!user) {
      return {
        haveAccount: false
      }
    }

    // CASE 2: Tìm thấy tài khoản với email này và chưa có Google ID
    if (!user.google_id) {
      // Cập nhật Google ID vào tài khoản hiện có
      await this.userRepository.updateGoogleId(email, google_id)

      return {
        haveAccount: true,
        googleIDIsValid: true
      }
    }

    // CASE 3: Tìm thấy tài khoản với email này và đã có Google ID
    if (user.google_id === google_id) {
      return {
        haveAccount: true,
        googleIDIsValid: true
      }
    } else {
      // Google ID không khớp với ID được lưu trong DB
      return {
        haveAccount: true,
        googleIDIsValid: false
      }
    }
  }

  async login({ email, password }: LoginReqBody) {
    const user = await this.userRepository.checkLogin(email, password)

    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: 'Invalid email or password'
      })
    }

    // Return user data hoặc JWT token
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  }

  async saveCVToDatabase(data: RegisterCVReqBody) {
    await this.cvRepository.createCV(data)
  }

  async getAllJDs() {
    return this.jdRepository.getAllJDs()
  }
}

const usersServices = new UsersServices()
export default usersServices

import { prisma } from '~/services/client'
import { v4 as ObjectId } from 'uuid'
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
  gender: string
  phone_number: string
  google_id?: string
  role?: number // 0: admin, 1: candidate, 2: employer
}

class UserRepository {
  private model = prisma.hACKATHON_Users

  async checkEmailExist(email: string) {
    return await this.model.findUnique({ where: { email } })
  }

  async updateUserHaveGoogleId(email: string, userData: RegisterReqBody) {
    return this.model.update({
      where: { email },
      data: {
        name: userData.name,
        password: userData.password,
        gender: userData.gender,
        phone_number: userData.phone_number,
        date_of_birth: new Date(userData.date_of_birth),
        updated_at: new Date()
      }
    })
  }

  async checkLogin(email: string, password: string) {
    console.log(email, password)
    return this.model.findFirst({
      where: {
        email,
        password
      }
    })
  }

  async createUser(
    userData: {
      name: string
      email: string
      password: string
      confirm_password: string
      date_of_birth: string
      gender: string
      phone_number: string
      google_id?: string
    },
    role: number
  ) {
    const id = ObjectId()
    return this.model.create({
      data: {
        id,
        ...userData,
        role
      }
    })
  }

  async updatePasswordById(user_id: string, password: string) {
    return this.model.update({
      where: { id: user_id },
      data: { password }
    })
  }

  async updateGoogleId(email: string, google_id: string) {
    return this.model.update({
      where: { email },
      data: { google_id }
    })
  }
}

export default UserRepository

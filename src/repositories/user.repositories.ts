import { prisma } from '~/services/client'

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

class UserRepository {
  private model = prisma.users

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
    return this.model.findFirst({
      where: {
        email,
        password
      }
    })
  }

  async createUser(userData: Users) {
    return this.model.create({ data: userData })
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

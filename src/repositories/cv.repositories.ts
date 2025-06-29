import { prisma } from '~/services/client'
import { v4 as ObjectId } from 'uuid'
import { RegisterCVReqBody } from '~/controller/user.controllers'

class CVRepository {
  private model = prisma.hACKATHON_CVs

  async createCV(userData: RegisterCVReqBody) {
    console.log('Creating CV with data:', userData)
    return this.model.create({
      data: {
        id: ObjectId(),
        user_id: userData.user_id,
        skills: userData.skills,
        projects: userData.projects,
        experience: userData.experience,
        education: userData.education
      }
    })
  }

  async getAllCVs() {
    return this.model.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
  }
}

export default CVRepository

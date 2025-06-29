import { prisma } from '~/services/client'

class JDRepository {
  private model = prisma.hACKATHON_JDs

  async getAllJDs() {
    return this.model.findMany({
      orderBy: { created_at: 'desc' }
    })
  }
}

export default JDRepository

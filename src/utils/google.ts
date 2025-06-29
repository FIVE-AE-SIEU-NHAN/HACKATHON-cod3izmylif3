export interface TokenGoogleVerifyPayload {
  email: string
  email_verified: boolean
  name: string
  picture?: string
  locale?: string
  family_name?: string
  given_name?: string
  sub: string
}

export const verifyGoogleToken = async (token: string): Promise<TokenGoogleVerifyPayload> => {
  const { OAuth2Client } = await import('google-auth-library')
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload()
  return payload as TokenGoogleVerifyPayload
}

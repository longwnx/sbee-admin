import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { env } from '@/config'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: ({ token, account, user }) => {
      if (account && user) {
        token.token = account.access_token || ''
        token.refreshToken = account.refresh_token || ''
        token.user = user
      }
      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.user = token.user
      return session
    },
  },
  events: {},
}
export default NextAuth(authOptions)

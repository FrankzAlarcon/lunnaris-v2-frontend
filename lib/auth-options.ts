import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@/actions/auth';
import { NEXTAUTH_SECRET } from '@/config';
import { getUser } from '@/actions/get-user';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            throw new Error('Missing credentials')
          }
          const data = await login({
            email: credentials.email,
            password: credentials.password
          })

          if (data === null) {
            console.log('Invalid credentials')
            return null
          }

          const user = await getUser(data.id, data.token)
          console.log('[authorize - getUser]', user)
          if (!user) {
            throw new Error('User not found')
          }
  
          return {
            ...user,
            userType: user.type.id,
            token: data.token,
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt: async (data) => {
      const {token, user} = data
      if (user) {
        return {
          ...token,
          id: user.id,
          fullName: user.fullName,
          userType: (user as any).type.id,
          jwt: (user as any).token 
        }
      }
      return token
    },
    session: async ({session, token}) => {
      if (token) {
        if (!session?.user) {
          throw new Error('Session already exists')
        }
        session.user.id = token.id as string
        session.user.fullName = token.fullName as string
        session.jwt = token.jwt as string
        session.user.userType = token.userType as number
      }
      return session
    }
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: NEXTAUTH_SECRET,
  debug: true,
}
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      fullName: string
      userType: number
    } & DefaultSession['user']
    jwt?: string
  }

  interface User {
    id: string
    fullName: string
    userType: number
  }
}
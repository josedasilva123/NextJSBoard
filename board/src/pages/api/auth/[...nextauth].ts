import { profile } from "console"
import NextAuth from "next-auth"
import { session, signIn } from "next-auth/client"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),    
  ],
  callbacks:{
    async session(session, profile){
      try{
        return{
          ...session,
          id: profile.sub,
        }
      } catch {
        return{
          ...session,
          id: null,
        }
      }
    },
    async signIn(user, account, profile){
      const {email} = user;
      try{
        return true;
      } catch (err) {
        console.log('Deu erro', err)
        return false;
      }
    }
  }
})
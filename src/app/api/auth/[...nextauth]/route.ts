import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { dbConnect } from "@/helper/dbConnect"
import User from "@/models/user.collection"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
    
  ],
  
  callbacks : {
    async session({ session, token, user } : any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user._id = token._id
      session.user.email = token.email
      session.user.name = token.name
      session.user.image = token.image
      return session
    },
    async jwt({ token, user } : any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if(user){
        const dbUser = await User.findOne({email : user.email}) 
        token.email = user.email ,
        token.name = user.name ,
        token.image = user.image ,
        token._id = (dbUser._id).toString() ;
      }
      return token
    },
    async signIn({user} : any)
    {
      try {
        await dbConnect()
        const dbUser = await User.findOne({email : user.email}) ;
        if(!dbUser){
          await User.create({
            name : user.name,
            email : user.email,
            image : user.image
          }) ;
          console.log("User Created")
          }
          else{
            console.log("User Exist")
          }
          return true ;
        }
        
       catch (error) {
        console.log(error)
        return false ;
      }
    }
  },
  
  secret : process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";


const handler = NextAuth({
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLINET_ID,
               clientSecret: process.env.GOOGLE_CLINET_SECRET,
          }),
          CredentialsProvider({
               name: "Credentials",
               id: "credentials",
               async authorize(credentials) {

                    await connect()

                    try {
                         // find the user in database
                         const user = await User.findOne({ email: credentials.email })

                         // check if the user exsist
                         if (user) {
                              // check the password
                              const isPasswordMatch = await bcrypt.compare(
                                   credentials.password,
                                   user.password
                              )

                              if (isPasswordMatch) {
                                   return user
                              } else {
                                   throw new Error("Invalid password")
                              }
                         } else {
                              throw new Error("User not found")
                         }

                    } catch (err) {
                         throw new Error(err)
                    }
               }
          })
     ],
     pages: {
          error: '/dashboard/login',
     }
})

export { handler as GET, handler as POST }
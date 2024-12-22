import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/userModel";
import connectDB from "@/libs/db/mongodb";
import bcrypt from "bcrypt";
import { User as NextAuthUser } from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to db to verify the user credentials
        await connectDB();

        // Retrieve the email and password from the credentials
        const { email, password } = credentials || {}; // Use empty object if credentials is undefined

    if(!password) {
        throw new Error("Password is required")
    }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt", // (JSON Web token for session handling)
  },

  // Allow customization of the session and JWt behavior
  callbacks: {
    async jwt({ token, user }) {
        // If user is logged in and user data is availablem add the user id to the token
      if (user) {

    token.id = (user as NextAuthUser).id; // Ensures user has an "id" property
      }
    
      return token;
    },

    async session({ session, token }) {
        // If session and session.user exist, add the user id to the session object
      if(session?.user) {
        session.user.id = token.id as string; // ENsures id is treated as a string
      }
    
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});

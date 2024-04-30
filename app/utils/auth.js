import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
  ],
  secret: process.env.AUTH_SECRET,
};

import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDb from "@/app/libs/mongodb";
import UserModel from "@/app/models/userSchema";
import NextAuth from "next-auth"
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as any
                await connectMongoDb();
                // Find the user by the username
                const user = await UserModel.findOne({ username });
                // Continue processing the response data
                // If the user doesn't exist, return a 404 error
                if (!user) {
                    return (console.error("No user found"));
                }

                // Check if the passwords match
                // Hashed password from your user object
                const hashedPassword = user.password;

                // Check if the supplied password, when hashed, is the same as the stored hashed password
                const isMatch = await bcrypt.compare(password, hashedPassword);
                if (!isMatch) {
                    return (console.log("Incorrect password"));
                }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // Return an object that will pass error information through to the client-side.
                    return null
                }


            }
        })
    ],

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: "/admins"
    }





})

export { handler as GET, handler as POST }

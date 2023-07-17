import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth"

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
                const res = await fetch("", {
                    method: "POST",
                    headers: {
                        "Content-Type": "aplication/json"
                    },

                    body: JSON.stringify({
                        username,
                        password
                    })
                })

            }
        })
    ]
})

export { handler as GET, handler as POST }

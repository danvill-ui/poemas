import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const apiUrl = process.env.ORFEOAPI;
          console.log("URL final de fetch:", `${apiUrl}/users/login`);

          const res = await fetch(`${apiUrl}/users/login`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          });

          
          const user = await res.json();
          console.log('user ', user);

          if (res.ok && user) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              autor: user.autor ? user.autor.id : null 
            };
          }
          
          return null;
        } catch (error) {
          console.error("Error al conectar con el backend:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.autor = user.autor; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          autor: token.autor, 
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

console.log("DEBUG: Variable ORFEOAPI =", process.env.ORFEOAPI);
console.log("DEBUG: Variable NEXTAUTH_URL =", process.env.NEXTAUTH_URL);

// 💡 ESTO ES LO QUE FALTABA PARA QUE EL APP ROUTER FUNCIONE:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
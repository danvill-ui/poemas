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
          // Usamos la variable de entorno del servidor o de Next Public según prefieras
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
              // Comprobamos si user.autor viene definido y cogemos su ID (o el objeto entero)
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
      // Si el usuario acaba de loguearse, pasamos sus datos al token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.autor = user.autor; // <-- ¡Guardamos el autor aquí!
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos los datos del token a la sesión del cliente
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          autor: token.autor, // <-- ¡Lo inyectamos en la sesión para usarlo en el frontend!
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
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
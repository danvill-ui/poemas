import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.BACK_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const user = await res.json();

          // Normalizamos los campos a lo que NextAuth espera
          return {
            id: user.id,
            name: user.nombre,   // tu API devuelve "nombre"
            email: user.email,
          };
        } catch (error) {
          console.error("Error al conectar con la API:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name; // guardamos "nombre" como username
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

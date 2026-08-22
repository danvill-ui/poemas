import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const userAgent = req.headers.get("user-agent") || "";
      
      // Permitir explícitamente el acceso a los bots de redes sociales
      const isSocialBot = /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|TelegramBot/i.test(userAgent);
      if (isSocialBot) {
        return true; 
      }

      // Para cualquier usuario normal, exigir que esté logueado (token activo)
      return !!token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|img/).*)",
  ],
};
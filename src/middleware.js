import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Ruta a donde se redirigirá al usuario si no está logueado
  },
});

// Define qué rutas quieres proteger (o excluye las públicas)
export const config = {
  matcher: [
    /*
     * Protege todas las rutas de la aplicación excepto:
     * - La página de login o raíz si es pública
     * - Archivos estáticos, imágenes, favicon, etc.
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|img/).*)",
  ],
};
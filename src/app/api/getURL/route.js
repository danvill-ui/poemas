export async function GET() {
  // El servidor de Next.js lee la variable de servidor sin problema
  const apiUrl = process.env.ORFEOAPI;
  
  // LOG en la terminal del servidor (PM2)
  console.log("DEBUG: Variable ORFEOAPI leída en la API:", apiUrl);

  // Devolvemos un objeto claro
  return Response.json({ 
    orfeoApiUrl: apiUrl || "NO_CONFIGURADO",
    debug_env: process.env.ORFEOAPI ? "Encontrada" : "No encontrada"
  });
}
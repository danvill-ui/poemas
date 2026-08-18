import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. Extraer los parámetros de la URL (como ?q=...&tema=...&limit=...&offset=...)
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const tema = searchParams.get('tema') || '';
    const limit = searchParams.get('limit') || '20';
    const offset = searchParams.get('offset') || '0';

    // 2. Obtener la URL base del backend (en servidor usamos la variable de entorno directamente)
    const orfeoApiUrl = process.env.ORFEOAPI || 'https://localhost:4000';

    // 3. Construir la URL hacia tu Express (en singular: /poema/search)
    let url = `${orfeoApiUrl}/poema/search?limit=${limit}&offset=${offset}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    if (tema) url += `&tema=${encodeURIComponent(tema)}`;

    // 4. Hacer la petición al backend de Express
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Error en el servidor backend' }, { status: response.status });
    }

    const data = await response.json();

    // 5. Retornar la respuesta correctamente formateada al cliente (Redux)
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('🔥 Error en el proxy de búsqueda de poemas:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
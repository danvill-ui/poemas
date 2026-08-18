import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const orfeoApiUrl = process.env.ORFEOAPI || 'http://localhost:4000';

    // Llama al servidor de Express usando la ruta en singular (/poema/:id/metricas)
    const response = await fetch(`${orfeoApiUrl}/poema/${id}/metricas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error en proxy POST de métricas:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    // El servidor de Next.js le pide los datos al backend de Express (puerto 4000)
    // Al hacerse de servidor a servidor, CORS jamás interfiere.
    const response = await fetch(`${process.env.ORFEOAPI}/poema/${id}/info`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No se pudo obtener la info' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error en proxy de Next.js:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
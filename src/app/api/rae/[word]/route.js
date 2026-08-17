// app/api/rae/[word]/route.js
export async function GET(request, props) {
  const params = await props.params;
  const { word } = params;
  //TODO- Chequear y guardar en base de datos la palabra nueva. En caso que exista la palabra responder con la de la base de datos
  try {
    const response = await fetch(`https://rae-api.com/api/words/${word.replaceAll('.','').replaceAll(',','')}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al consultar la RAE:', error);
    return new Response(JSON.stringify({ error: 'Error al consultar la RAE' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

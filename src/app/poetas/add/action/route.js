// src/app/poetas/add/action/route.js
export async function POST(req) {
  try {
    // Recoger los datos del formulario
    const formData = await req.formData();

    const nombre = formData.get("nombre");
    const apellidos = formData.get("apellidos");
    const nacionalidad = formData.get("nacionalidad");
    const fecha_nacimiento = formData.get("fecha_nacimiento");
    const fechafallecimiento = formData.get("fechafallecimiento");
    const biografia = formData.get("biografia");

    // Construir el objeto JSON
    const body = {
      nombre,
      apellidos,
      nacionalidad,
      fecha_nacimiento,
      fechafallecimiento,
      biografia,
    };

    // Hacer la llamada a tu API externa
    const response = await fetch(`${process.env.BACK_URL}/poeta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `Error en API: ${response.status} ${errorText}` }),
        { status: response.status }
      );
    }

    const resultado = await response.json();

    // Devolver la respuesta al cliente
    return new Response(JSON.stringify(resultado), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

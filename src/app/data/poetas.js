'use server'
// src/app/data/poetas.js
export async function PostPoeta(req) {
  try {
    const formData = await req.formData();

    const nombre = formData.get("nombre");
    const apellidos = formData.get("apellidos");
    const nacionalidad = formData.get("nacionalidad");
    const fecha_nacimiento = formData.get("fecha_nacimiento");
    const fechafallecimiento = formData.get("fechafallecimiento");
    const biografia = formData.get("biografia");

    const resultado = await postPoeta({
      nombre,
      apellidos,
      nacionalidad,
      fecha_nacimiento,
      fechafallecimiento,
      biografia,
    });

    return new Response(JSON.stringify(resultado), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function getPoetas() {
  const response = await fetch(`${process.env.ORFEOAPI}/poeta`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  return await response.json();

}

export async function getTotalPoetas() {
  const response = await fetch(`${process.env.ORFEOAPI}/poeta/cuenta/total`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  console.log('response',response)
  return await response.json();

}

export async function getPoetasDestacados() {
  const response = await fetch(`${process.env.ORFEOAPI}/poeta/top/destacados`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  console.log('response',response)
  return await response.json();

}


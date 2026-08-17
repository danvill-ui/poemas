'use server'
export async function getTotalEstrofas() {
  const response = await fetch(`${process.env.ORFEOAPI}/estrofa/cuenta/total`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });


  return await response.json();

}
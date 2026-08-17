'use server'
export async function getTotalVersos() {
  const response = await fetch(`${process.env.ORFEOAPI}/verso/cuenta/total`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  console.log('response',response)
  return await response.json();

}
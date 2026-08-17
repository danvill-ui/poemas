'use server'
export default async function addMeaning (word){
    const response=  await fetch(`${process.env.ORFEOAPI}/palabra/${word}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()

}

export async function getTotalPalabras() {
  const response = await fetch(`${process.env.ORFEOAPI}/palabra/cuenta/total`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  console.log('response',response)
  return await response.json();
}
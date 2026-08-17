'use server'

export default async function postPoema({titulo,texto}){

      const response = await fetch(`${process.env.ORFEOAPI}/poema`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo : titulo, texto : texto}),
        });
       const mensaje= await response.json();
   

}
export async function getTotalPoemas() {
  const response = await fetch(`${process.env.ORFEOAPI}/poema/cuenta/total`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  console.log('response',response)
  return await response.json();

}

export async function getPoemasDestacados(size,limit){
  
    const response = await fetch(`${process.env.ORFEOAPI}/poema/top/analisis?limit=${size}&offset=${limit}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache:'no-cache'
  });

  return await response.json();
}
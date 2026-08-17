'use server'
import Link from "next/link";
import obtenerColorEmocionalPersonalizado from "@/components/functions/poemColor";
import PoemChips from "@/components/PoemChips";
import BiografiaPoeta from "./biografia";
import { Button } from "@mui/material";


export default async function PagePoem(props) {
  console.log('env',process.env.ORFEOAPI)
  const params = await props.params;
  const poetaId=await params.poeta
  const urlPoeta=`${process.env.ORFEOAPI}/poeta/${poetaId}/`
  const urlListPoemas=`${process.env.ORFEOAPI}/poeta/${poetaId}/poemas`
  const response = await fetch(urlPoeta, {
  method: "GET",
 cache: "no-cache" // opción estándar de fetch
});
  const responseList = await fetch(urlListPoemas, {
   method: "GET",
  cache: "no-cache" // opción estándar de fetch
 });

  //console.log('responseList = ',responseList)
  if (!responseList.ok) {
   throw new Error("No se pudo cargar el poema");
  }


  const poeta = await response.json();
  const listPoemas=await responseList.json();
  const color=obtenerColorEmocionalPersonalizado(poeta.media_eco,poeta.media_transgresion,poeta.media_katarsis)
console.log('color =>',color)
  console.log('poeta =',poeta)
  return (
     <>
       <span className={'p-4'} style={{backgroundColor:color}}/>

       <h1 className="text-center text-2xl !text-gold mb-3 uppercase font-serif  my-3" style={{letterSpacing:'3px'}}>
         {poeta.nombre}
       </h1>
 <img src={poeta.imagen_url} className={'mx-auto'} style={{maxWidth:'200px'}}/>
       <nav className={'text-center my-3'}><b className={'me-2'}>{poeta.nombre_pais}</b>
       <small>{poeta.anio_nacimiento} - {poeta.anio_fallecimiento ||  '-'}</small></nav>
        <BiografiaPoeta biografiaPoeta={poeta.biografia_completa}/>
      
       
     <h2 className={'container text-bold'}><b>Orfeo estudió</b></h2>
       <ul className='container grid-container'>
        
         {listPoemas.map((el) => (
           <li key={el.id} className="my-2 grid-col-3 rounded-md shadow-lg p-2 text-center bg-gold/20" >
            <div 
  className="p-4" 
  style={{ backgroundColor: obtenerColorEmocionalPersonalizado(el.eco, el.transgresion, el.katarsis) }} 
/>
             <Link href={`/poema/${el.titulo.replaceAll(' ','-')}-${el.id}`} className="w-100 hover:text-blue-600 transition-colors" >
                <h3 className={'my-4 text-bold'}>{el.titulo} </h3>
               <PoemChips temas={el.temas_clave}/>
             </Link>
           </li>
         ))}
       </ul>
     </>
   );
}

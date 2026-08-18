'use server'
import Link from "next/link";
import obtenerColorEmocionalPersonalizado from "@/components/functions/poemColor";
import PoemChips from "@/components/PoemChips";
import BiografiaPoeta from "./biografia";
import { Button } from "@mui/material";

export default async function PagePoem(props) {
  console.log('env', process.env.ORFEOAPI)
  const params = await props.params;
  const poetaId = await params.poeta
  const urlPoeta = `${process.env.ORFEOAPI}/poeta/${poetaId}/`
  const urlListPoemas = `${process.env.ORFEOAPI}/poeta/${poetaId}/poemas`
  
  const response = await fetch(urlPoeta, {
    method: "GET",
    cache: "no-cache"
  });
  
  const responseList = await fetch(urlListPoemas, {
    method: "GET",
    cache: "no-cache"
  });

  if (!responseList.ok) {
    throw new Error("No se pudo cargar el poema");
  }

  const poeta = await response.json();
  const listPoemas = await responseList.json();
  const color = obtenerColorEmocionalPersonalizado(poeta.media_eco, poeta.media_transgresion, poeta.media_katarsis)
  
  console.log('color =>', color)
  console.log('poeta =', poeta)

  return (
    <>
      <span className={'p-4'} style={{ backgroundColor: color }} />

      <h1 className="text-center text-2xl !text-gold mb-3 uppercase font-serif my-3" style={{ letterSpacing: '3px' }}>
        {poeta.nombre}
      </h1>
      
      <img src={poeta.imagen_url} className={'mx-auto'} style={{ maxWidth: '200px' }} />
      
      <nav className={'text-center my-3'}>
        <b className={'me-2'}>{poeta.nombre_pais}</b>
        <small>{poeta.anio_nacimiento} - {poeta.anio_fallecimiento || '-'}</small>
      </nav>
      
      <BiografiaPoeta biografiaPoeta={poeta.biografia_completa} />
      
      <h2 className={'container text-bold mt-8 mb-4'}><b>Orfeo estudió</b></h2>
      
      {/* Contenedor adaptado con scroll horizontal en móvil (dos y medio) y grid en desktop */}
      <div className="container mx-auto px-4">
        <ul className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4 sm:pb-0 scrollbar-thin">
          {listPoemas.map((el) => {
            const colorPoema = obtenerColorEmocionalPersonalizado(el.eco, el.transgresion, el.katarsis);
            return (
              <li 
                key={el.id} 
                className="border border-gold/30 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gold/5 flex flex-col items-center text-center p-4 flex-shrink-0 sm:flex-shrink w-[40vw] sm:w-auto snap-start relative"
              >
                <Link href={`/poema/${el.titulo.replaceAll(' ', '-')}-${el.id}`} className="w-full flex flex-col items-center">
                  {/* Círculo superior con el color emocional del poema */}
                  <div 
                    className="w-12 h-12 rounded-full shadow-inner my-2 border border-gold/40 flex-shrink-0" 
                    style={{ backgroundColor: colorPoema }}
                  />

                  <h3 className="font-bold text-onyx font-serif text-sm sm:text-base line-clamp-2 my-2">{el.titulo}</h3>
                  <PoemChips temas={el.temas_clave} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
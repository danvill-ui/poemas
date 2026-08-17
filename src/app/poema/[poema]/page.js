'use ser'
import ContentPoem from "@/app/poema/[poema]/_ContentPoem";
import PoemChips from "@/components/PoemChips"; // <-- Importa el componente cliente
import Link from "next/link";
import { obtenerColorEmocionalOrfeo } from "@/components/Poema/TarjetaPoemaEmocional";

export default async function PagePoem(props) {
 const params = await props.params;
 const poemaId = await params.poema.split('-')[params.poema.split('-').length-1];
 const urlPoema = `${process.env.ORFEOAPI}/poema/${poemaId}`;
 const urlPoeta = `${process.env.ORFEOAPI}/poema/${poemaId}/autor`;
 const urlRelacionados = `${process.env.ORFEOAPI}/poema/${poemaId}/relacionados`;
 
 const response = await fetch(urlPoema, { method: "GET", cache: "no-cache" });
 const responsePoeta = await fetch(urlPoeta, { method: "GET", cache: "no-cache" });
 const responseRelacionado = await fetch(urlRelacionados, { method: "GET", cache: "no-cache" });

 if (!response.ok) {
   throw new Error("No se pudo cargar el poema");
 }

 const poema = await response.json();
 const poeta = await responsePoeta.json();
 const relacionados = await responseRelacionado.json();

 console.log('related',relacionados)

 const color = obtenerColorEmocionalOrfeo(poema?.poema.eco, poema.poema.transgresion, poema.poema.katarsis);
 
 return (
   <>
      <PoemChips temas={poema.poema?.temas_clave} />
     <header className="flex flex-col items-center justify-center my-4 px-4 py-2 sticky top-0 z-50 bg-white" style={{ top: 'var(--height-header)' }} >
       {/* Renderizamos los chips interactivos de manera local */}

       <div className="flex items-center gap-3 ">
         <div 
           className="w-6 h-6 rounded-full shadow-md flex-shrink-0" 
           style={{ backgroundColor: color }} 
         ></div>
         <h1 className="text-center text-2xl uppercase font-serif text-gold tracking-[3px] m-0">
           {poema.poema.titulo}
         </h1>
       </div>
        <Link href={`/poetas/${poeta.id}`} className="text-center text-underline poeta flex mx-auto">
       <img src={'/img/soplo.svg'} className={'me-2 mt-1'} style={{width:'20px',height:'20px',borderRadius:'100%'}}/><b>{poeta.nombre}</b><img src={'/img/soplo.svg'} className={'ms-2 mt-1'} style={{width:'20px',height:'20px',borderRadius:'100%',transform: 'scaleX(-1)'}}/>
     </Link>
     </header>


     <ContentPoem poema={poema} relacionados={relacionados}/>
   </>
 );
}
import ContentPoem from "@/app/poema/[poema]/_ContentPoem";
import PoemChips from "@/components/PoemChips";
import Link from "next/link";
import { obtenerColorEmocionalOrfeo } from "@/components/Poema/TarjetaPoemaEmocional";

// 💡 Función nativa de Next.js para generar el título dinámico en el servidor
// 💡 Función nativa de Next.js para generar metadatos dinámicos y Open Graph para WhatsApp
// 💡 Función nativa de Next.js para generar metadatos dinámicos optimizados para WhatsApp
export async function generateMetadata(props) {
  const params = await props.params;
  const poemaId = params.poema.split('-')[params.poema.split('-').length - 1];
  
  try {
    const resPoema = await fetch(`${process.env.ORFEOAPI}/poema/${poemaId}`, { cache: "no-cache" });
    const resPoeta = await fetch(`${process.env.ORFEOAPI}/poema/${poemaId}/autor`, { cache: "no-cache" });
    
    if (!resPoema.ok || !resPoeta.ok) {
      return { title: "orfeo.io | Poema" };
    }

    const poemaData = await resPoema.json();
    const poetaData = await resPoeta.json();

    const titulo = poemaData?.poema?.titulo || "Poema";
    const autor = poetaData?.nombre || "Autor anónimo";
    
    // Título limpio para la pestaña del navegador y OpenGraph principal
    const pageTitle = `${titulo} - ${autor} | orfeo.io`;
    const descriptionText = `Lee el poema "${titulo}" escrito por ${autor}. Descubre más poesía en orfeo.io.`;

    const baseUrl =  'https://orfeo.io';
    const currentUrl = `${baseUrl}/poema/${params.poema}`;
    const imageShare = `${baseUrl}/img/default-share.png`;

    return {
      title: pageTitle,
      description: descriptionText,
      openGraph: {
        title:`${titulo} | Poema de ${autor} | orfeo.io`, // 💡 Forzamos a que el título principal de la tarjeta sea estrictamente el nombre del poema
        description: `${titulo} | Poema de ${autor} | orfeo.io`,
        url: currentUrl,
        siteName: 'orfeo.io',
        type: 'article',
        authors: [autor],
        images: [
          {
            url: imageShare,
            width: 1200,
            height: 630,
            alt: titulo,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: titulo,
        description: `Poema de ${autor}. orfeo.io`,
        images: [imageShare],
      },
    };
  } catch (error) {
    return { title: "orfeo.io | Poesía" };
  }
}

export default async function PagePoem(props) {
  const params = await props.params;
  const poemaId = params.poema.split('-')[params.poema.split('-').length - 1];
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

  console.log('rlaciona',relacionados)

  const color = obtenerColorEmocionalOrfeo(poema?.poema.eco, poema.poema.transgresion, poema.poema.katarsis);
  
  return (
    <>
      <PoemChips temas={poema.poema?.temas_clave} />
      <header className="flex flex-col items-center justify-center my-4 px-4 py-2 sticky top-0 z-50 bg-white" style={{ top: 'var(--height-header)' }} >
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
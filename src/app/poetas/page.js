
import { TextField } from "@mui/material"
import { getPoetas } from "../data/poetas";
import Link from "next/link"


export default async function PoetasPage() {
  const poetas = await getPoetas();
  
  // 1. Filtramos o garantizamos que nacionalidad_oficial tenga un valor por defecto
  const poetasProcesados = poetas.map(p => ({
    ...p,
    nacionalidad_oficial: p.nacionalidad_oficial || 'Desconocido'
  }));

  // 2. Ordenamos con seguridad
  const poetasOrdenados = [...poetasProcesados].sort((a, b) => 
    a.nacionalidad_oficial.localeCompare(b.nacionalidad_oficial)
  );

  return (
    <div>
      <h2>Lista de Poetas</h2>
      <ul>
        {poetasOrdenados.map((el) => (
          <li key={el.id} className={'my-2'}>
            <Link href={`poetas/${el.id}`} className={'flex items-center'}>
              {/* Imagen con fallback si no hay URL */}
              <img 
                src={el.imagen_url || '/placeholder-autor.png'} 
                className={'me-2'} 
                style={{borderRadius:'100%', width:'30px', height:'30px', objectFit: 'cover'}}
                alt={el.nombre}
              />
              {el.nombre} - <em>{el.nombre_pais}</em>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

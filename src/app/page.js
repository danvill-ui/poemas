'use client'

import Numeros from "@/components/main/Numeros";
import TrianguloSlide from "@/components/TrianguloSlide/TrianguloSlide";
import { Button } from "@mui/material";
import { getPoetasDestacados } from "./data/poetas";
import { useEffect, useState } from "react";
import { getPoemasDestacados } from "./data/poema";
import Link from "next/link";
import './video.css'
import PresentacionOrfeo from "@/components/main/Presentacion";

export default function HomePage() {

  const [poetas, setPoetas] = useState([])

  const [poemasDestacados, setPoemasDestacados] = useState([])

  useEffect(() => {

    const setPoets = async () => {
      const jander = await getPoetasDestacados()
      
      const poemas = await getPoemasDestacados(3,0)
      setPoetas(jander)
  
      setPoemasDestacados(poemas)
    }

    setPoets()
  }, [])



  return <>
  <PresentacionOrfeo/>
  <Numeros/>

    

    <section className={'bg-white text-onyx py-4 shadow-lg'}>

      <ol className={'grid-container my-2'}>
        
        <li className={'flex flex-col grid-col-4 text-center  p-2'}>

          <i className={'icon icon-transgresion mb-4 text-orfeo-transgresion text-9xl'} />
          <h3 className={'text-onyx text-black mb-2 uppercase text-2xl font-semibold tracking-widest font-sans'}>Transgresion</h3>

          <p className={' font-sans'}>Traspasar el filo que rompe el espejo de lo establecido, el acto audaz de cruzar la frontera de lo prohibido para reclamar una verdad que, aunque peligrosa, nos devuelve la libertad de definirnos más allá del sueño común.</p>
        </li>
        <li className={'flex flex-col grid-col-4 text-center  p-2'}>
          <h3 className={'text-onyx text-black mb-2 uppercase text-2xl font-semibold tracking-widest font-sans'}>Katarsis</h3>

          <i className={'icon icon-katarsis text-9xl mb-4 text-orfeo-katarsis'} />
          <p className={'font-sans'}>Vivir en uno la tormenta necesaria que purifica el alma, el instante en que el dolor se desborda y se consume a sí mismo para dejar, tras el caos, un silencio absoluto donde por fin puedes volverte a encontrar.</p>
        </li>
        <li className={'flex flex-col grid-col-4 text-center p-2'}>

          <i className={'icon icon-eco text-9xl mb-4 text-orfeo-eco'} />
          <h3 className={'text-onyx text-black mb-2 uppercase text-2xl font-semibold tracking-widest font-sans'}>Eco</h3>

          <p className={'font-sans'}>Leer el susurro de la existencia que, al chocar contra los muros del olvido, regresa hacia nosotros cargado con la verdad que nos negamos a escuchar en el silencio original.</p>
        </li>
      </ol>

    </section>
    <section className={'bg-onyx text-terracotta py-5 px-3'}>
      <div className={' flex '}>
        <ol className={'grid grid-cols-1 md:grid-cols-4 gap-4'}>
          {poetas.map((el, index) => {
            if (!el.imagen_url || el.imagen_url.trim() === "" || index > 3) return null;
            return <li key={index} className="flex flex-col items-center text-center shadow-md text-terracotta min-w-0 p-4 overflow-hidden">
  <img 
    src={el.imagen_url} 
    className="mx-auto rounded-full object-cover" 
    style={{ width: 50, height: 50 }} 
    alt={el.nombre}
  />
  <h3 className="text-gold font-bold text-2xl my-3">{el.nombre}</h3>
  
  {/* El min-w-0 en el padre (li) y el block aquí aseguran que el line-clamp funcione */}
  <p className="text-white mb-5 overflow-hidden break-words [-webkit-box-orient:vertical] [-webkit-line-clamp:4] [display:-webkit-box]" >
    {el.biografia}
  </p>
  
  <Button 
    href={`/poetas/${el.id}`} 
    className="!bg-gold text-onyx hover:bg-gold-light transition-all rounded-md mt-auto p-2 w-fit mx-auto"
    variant="contained"
    style={{marginTop:'auto'}}
  >
    Ir a página de poeta
  </Button>
</li>
          })}


        </ol>
      </div>
    </section>

    <section className='bg-marble py-4'>
      <div className={'container'}>
        {poemasDestacados?.data?.map((el, index) => {
          //   if (!el.imagen_url || el.imagen_url.trim() === "") return null;
          return <li key={index} className={`py-2 flex items-center content-center text-onyx ${index !== poemasDestacados.length - 1 ? 'border-b-2 border-terracotta' : ''}`}>
            <div className={'w-1/3 flex items-center'}>
            <img src={el.imagen_url} style={{ width: 50, height: 50 }} className={'rounded-full me-2'} />
            <div className={'flex flex-col'}>
              <Link href={`/poema/${el.poema_id}`}>{el.primer_verso}[...]</Link>
              <b className={'uppercase font-serif text-gold'}>{el.autor}</b>
            </div>
            </div>
            
            <article className={'text-onyx radius w-2/3 ms-auto p-3 flex rounded-md min-w-0'}>
              <img src={'/img/orpheo.svg'} width={'w-1/8'} style={{ maxWidth: 40 }} className={'me-2'} />
              <div className="min-w-0 flex-1 me-3">
                <i className="my-auto font-semibold text-gold ">
                  {el.veredicto_mitico}
                  <p>.......................................</p>
                  {el.analisis_objetivo}
                </i>
              </div>
            <div className='grid grid-cols-3 gap-x-4 gap-y-1 flex-none'>
      <div className='flex items-center text-orfeo-transgresion'>
        <span className='icon icon-transgresion me-1 text-2xl' />
        <span className={'text-onyx font-bold min-w-[2ch]'}>{el.transgresion}</span>
      </div>
      <div className='flex items-center text-orfeo-katarsis'>
        <span className='icon icon-katarsis me-1 text-2xl' />
        <span className={'text-onyx font-bold min-w-[2ch]'}>{el.katarsis}</span>
      </div>
      <div className='flex items-center text-orfeo-eco'>
        <span className='icon icon-eco me-1 text-2xl' />
                <span className={'text-onyx font-bold min-w-[2ch]'}>{el.eco}</span>

      </div>
    </div>
            </article>


          </li>
        })}
      </div>
    </section>
  </>
}

import { getTotalEstrofas } from "@/app/data/estrofa"
import { getTotalPoemas } from "@/app/data/poema"
import { getTotalPalabras } from "@/app/data/palabra"
import { getTotalPoetas } from "@/app/data/poetas"
import { getTotalVersos } from "@/app/data/verso"
import { useState,useEffect } from "react"
import { CircularProgress } from "@mui/material"
import CountUp from "react-countup"

export default function Numeros(){
  const [totalPoetas, setTotalPoetas] = useState(0)
  const [totalPoemas, setTotalPoemas] = useState(0)
  const [totalVersos, setTotalVersos] = useState(0)
  const [totalEstrofas, setTotalEstrofas] = useState(0)
  const [totalPalabras, setTotalPalabras] = useState(0)


  useEffect(()=>{
    const getNumbers = async() =>{
        console.log('inside useEffecgt')
         const poetas = await getTotalPoetas()
         const poemas =await getTotalPoemas()
        const versos = await getTotalVersos()
        const estrofas = await getTotalEstrofas()
        const palabras = await getTotalPalabras()
        
        setTotalPoetas(poetas.total)
        setTotalPoemas(poemas.total)
        setTotalVersos(versos.total)
        setTotalEstrofas(estrofas.total)
        setTotalPalabras(palabras.total)
    }
    getNumbers()
  },[])

  const entidades=[
    {name:'Poetas',total:totalPoetas},
    {name:'Poemas',total:totalPoemas},
    {name:'Estrofas',total:totalEstrofas},
    {name:'Versos',total:totalVersos},
    {name:'Significados',total:totalPalabras}
  ]

    return <section className="border-t-2 border-b-2 border-dotted border-gold bg-gold">
      <div className="container mx-auto">
        {/* Eliminamos grid-col-12 y usamos clases de grid responsive directas */}
        <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-10 font-bold text-onyx font-serif uppercase">
            {entidades.map((el,index)=>{
               return <li key={index} className='flex flex-col items-center justify-center text-center font-sans'>
            <span className={'text-3xl md:text-5xl text-white font-sans'}>
                {el.total===0?<CircularProgress color="secondary" size={40} thickness={4}/>:<CountUp start={0} end={el.total} duration={2.5} separator="." />}
            </span> {el.name}
          </li>
            })}
    

        </ol>
      </div>
    </section>
}
import OrfeoVideo from "../_orfeoVideo"
import { Tooltip } from "@mui/material"
import Image from "next/image"
import { useEffect,useState } from "react"
import PoemChips from "../PoemChips"



export default function PresentacionOrfeo(){
    const [numero,setNumero]=useState(0)
    const etapas=[
      /*  {id:0,textoOriginal:'αὐτὰρ ὁ φορμίζων λιγέα νόμον... / ...ἐν δ ἐτέθησαν / κύματα καὶ νηνεμίη',textoTraducido:'Y él, pulsando su cítara con notas claras... / ...y se apaciguaron / las olas y el viento',videoURL:'/videos/mar.mp4',referencia:'Apolonio de Rodas, Argonáuticas 1.540-542'},
        {id:1,textoOriginal:'Ἐπικαλοῦμαί σε τὸν ἐν τῷ Ἅιδῃ, ἐπικαλοῦμαί σε κατὰ τοῦ καταβάντος εἰς τὰς σκιὰς καὶ ἐπανελθόντος μετὰ ἀληθείας...',textoTraducido:'Te invoco, espíritu que moras en el Hades, te invoco por el nombre de aquel que bajó a las sombras y regresó con la verdad en sus labios, el tracio Orfeo, maestro de las cuerdas que detuvo el llanto de los muertos...',videoURL:'/videos/egipto.mp4',referencia:'PGM IV. 3086-3124'},
        {id:2,textoOriginal:'Sie war schon aufgelöst.',textoTraducido:'Ella ya se había disuelto',videoURL:'/videos/resplandor.mp4',referencia:'Rilke'},
        {id:3,textoOriginal:'Omnia pontus erat, deerant quoque litora mundo',textoTraducido:'Todo era mar, y al mundo le faltaban también sus orillas',videoURL:'/videos/cocteau.mp4',referencia:'Ovidio, Metamorfosis I, 292'},*/
        {id:4,textoOriginal:'πάντα τε γὰρ δέχει, πάντων δ᾽ ἀποδέξει',textoTraducido:'Todo lo recibes, todo lo entregas',videoURL:'/videos/hades.mp4',referencia:'Himnos Orficos. Himno XVIII'}
    ]

 /*  useEffect(() => {
        const interval = setInterval(() => {
            setNumero((prevNumero) => (prevNumero + 1) % etapas.length)
        }, 10000)

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(interval)
    }, [etapas.length])*/

    const temas=['muerte','naturaleza','amor','duelo','vida','tiempo','memoria']


    return <section className={'relative flex align-center justify-center py-5'} style={{minHeight:'97vh'}}>
       
          
        <div className='overlay flex flex-col justify-center content-between'>
     <div className={'grid-col-4 flex align-center justify-center mb-4'}>

          </div>
    
            <article className={'text-center bg-white/80 rounded-lg text-gold px-2 mx-2 mb-4 '}>
        <i className=' mx-auto block font-serif text-gold text-6xl mb-4 '>
        {etapas[numero].textoOriginal} </i>
        <b className={'text-onyx my-1 uppercase block'}>{etapas[numero].textoTraducido}</b>          <b className={'text-onyx'}>{etapas[numero].referencia}</b>
      </article>
         <PoemChips temas={temas} className={'mt-3'}/>
        </div>
         
        
      </section>
}


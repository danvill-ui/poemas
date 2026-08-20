import Estrofa from "@/components/_Estrofa"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setPoema, setPoemaLoading } from "@/lib/store/Slice"
import { CircularProgress } from "@mui/material"
import './_Poema.css'
import { TarjetaPoemaEmocional, obtenerColorEmocionalOrfeo } from "@/components/Poema/TarjetaPoemaEmocional"

export default function Poema({ poema, relacionados }) {
  const dispatch = useDispatch();
  const { poema: poemaData, loading } = useSelector(state => state.poema); 

  console.log('poemaData',poemaData)
  useEffect(() => {
    // Activamos el loading al iniciar o cambiar de poema
    dispatch(setPoemaLoading(true));

    if (poema) {
      dispatch(setPoema(poema));
    }
  }, [poema, dispatch]);

  console.log('relacionados',relacionados)
  console.log('poema',poema)
  // Si está cargando o todavía no tenemos el objeto del poema en Redux, mostramos el loading
  if (loading || !poemaData?.estrofas || !poemaData.poema) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <CircularProgress color="inherit" sx={{ color: '#D4AF37' }} />
      </div>
    );
  }
  

  const color = obtenerColorEmocionalOrfeo(poemaData.poema.eco, poemaData.poema.transgresion, poemaData.poema.katarsis);
  const ideas = ['transgresion', 'katarsis', 'eco'];

  console.log('relacionados',relacionados)
  return (
    <>
      <section className="text-center mb-9 md:text-center font-sans text-onyx text-2xl p-3" >
        {poemaData.estrofas?.map((est, index) => (
          <Estrofa key={index} estrofa={est.versos} className={'estrofa'} />
        ))}
      </section>

      <section>
        <TarjetaPoemaEmocional eco={poemaData.poema.eco} transgresion={poemaData.poema.transgresion} katarsis={poemaData.poema.katarsis}/>
      </section>
      
      <section>
        <h2 className="container mt-5 text-bold"><b>Orfeo relaciona:</b></h2><br/>
        <ol className='grid-container container mb-5'>
          {relacionados? relacionados?.map((el, index) => (
            <li key={index} className={'grid-col-3 border border-bold flex p-3 shadow-lg rounded-lg bg-gold/10 '}>
              <div className={'mx-auto'}> 
                <Link href={`/poema/${el.poema_id}`} className={'text-serif uppercase text-gold text-center flex flex-col'}>
                  <img src={el.autor_imagen} style={{width: 30, height: 30}} className={'mx-auto my-2'} alt={el.autor_nombre} />
                  <b>{el.autor_nombre}</b>
                  <i className="ph ph-star-four my-2 text-2xl"></i> 
                  {el.titulo_poema}
                </Link>
              </div>
            </li>
          )):null}
        </ol>
      </section>
    </>
  );
}
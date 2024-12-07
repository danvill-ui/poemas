'use client'
import Estrofa from "@/components/_Estrofa";
export default function ContentPoem(props){
    const {poema}=props


return (<>
    <div className={'flex flex-col justify-start py-7 align-center'}>
        <h1 className={'text-center font-title text-5xl'}>{poema.titulo}</h1>
        <section className={'flex flex-col my-2 text-center'}>
            {poema.estrofas.map((est, index) => {
                return <Estrofa key={index} estrofa={est.versos}/>
            })}
        </section>
    </div>
</>)
}
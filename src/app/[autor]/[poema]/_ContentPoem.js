'use client'
import Estrofa from "@/components/_Estrofa";
export default function ContentPoem(props){
    const {poema}=props
return (<>
        <section className={'poema flex flex-col text-center text-base'}>
            {poema.estrofas.map((est, index) => {
                return <Estrofa key={index} estrofa={est.versos}/>
            })}
        </section>
</>)
}
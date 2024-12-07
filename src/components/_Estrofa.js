import Verso from "@/components/_Verso";
export default function Estrofa(props){
    const estrofa={props}
    return <article className={'w-full my-7'} style={{minWidth:'100%'}}>
        {props.estrofa.map((verso,index)=>{
            return <Verso key={index} palabras={verso.contenido}/>
        })}
    </article>
}
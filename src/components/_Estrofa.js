import Verso from "@/components/_Verso";
export default function Estrofa(props){
    return <article className={'estrofa w-full py-2'} style={{minWidth:'100%'}}>
        {props.estrofa.map((verso,index)=>{
            return <Verso key={index} palabras={verso.contenido}/>
        })}
    </article>
}
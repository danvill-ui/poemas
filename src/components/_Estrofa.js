import Verso from "@/components/_Verso";
export default function Estrofa(props){
    console.log(props.estrofa)

    return <article className={'estrofa py-3 max-w-full'} style={{minWidth:'100%'}}>
    
        {props.estrofa.map((verso,index)=>{
            return <Verso key={index} palabras={verso.palabras}/>
        })}
    </article>
}
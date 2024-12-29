import Palabra from "@/components/_Palabra";
import { Word, Stress } from 'silabacion';
export default function Verso(props){
    const significados=props.palabras.split(' ')
    return <div className={'py-2'}>{significados.map((significado,index)=>{
       return <Palabra key={index} significado={significado}/>
    })} <sup className={'font-bold text-stone-700 text-sm'}></sup></div>
}
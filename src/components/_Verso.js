import Palabra from "@/components/_Palabra";
import { Word, Stress } from 'silabacion';
export default function Verso(props){
    const numSilabas=new Word(props.palabras.replaceAll(' ','').replaceAll('aa','a')).syllables.length
    console.log(numSilabas)
    const significados=props.palabras.split(' ')
    return <p className={''}>{significados.map((significado,index)=>{
       return <Palabra key={index} significado={significado}/>
    })} <sup className={'font-bold text-stone-700 text-sm'}>({numSilabas})</sup></p>
}
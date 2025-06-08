'use client'
import {useState,useRef,useEffect} from "react";
import Infoword from "@/components/_infoword";
import {ClickAwayListener} from "@mui/material";
import Preposicion from "@/components/tipoPalabras/_Preposicion";

export default function Palabra(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
   // console.log(props.significado)
    const  [dataRAE,setDataRAE]=useState(false),
        [open,setOpen]=useState(false),
        [palabra,setPalabra]=useState(props.significado),
        antonimos=[],
        sinonimos=[],
        [oldWords,setOldWords]=useState([palabra]),
        addWord=(newPalabra)=>{
        const newArrayWords=oldWords.concat(palabra)
        setOldWords(newArrayWords)
        setPalabra(newPalabra)
        },
        getDataRAE = async () =>{
            const word=palabra.slice(-1)==='s' ? palabra.slice(0,-1): palabra
            const data= await fetch('https://rae-api.com/api/words/'+word.replaceAll('.','').replaceAll(',','').replaceAll('!','').replaceAll('¡','')).then((res)=>res.json()).catch(()=>{setDataRAE(null)})
            setDataRAE( data)
        }
    useEffect(()=>{
        getDataRAE()
    },[palabra])

        if(!dataRAE || !dataRAE.ok){
            return <span className={'me-1 bg-amber-200 text-black relative'}>{palabra}</span>
        }
        const meaning=dataRAE ? dataRAE.data.meanings[0] : null,
            origin=meaning?meaning.origin:null,
            isPreposicion=meaning.senses.find(el=>el.category==='preposition')
            for(let el of meaning.senses){
                 el.antonyms ? antonimos.push(el.antonyms):null
                 el.synonyms ? sinonimos.push(el.synonyms):null
            }
       let className='me-1 relative'
    if(open){
        className+=' bg-white text-black'
    }
    if(isPreposicion){
        return <Preposicion palabra={palabra}/>
    }
    if(oldWords.length>1 && oldWords[0]!==palabra){
        className='border-2 p-3'
       // oldWords.length=1
    }
   const originWord=oldWords[0]
    const originString=origin?origin.raw:null
console.log(oldWords)

    return  <ClickAwayListener onClickAway={_=>setOpen(false)}><span className={'relative'}>
        {oldWords.length>1?<span className={'absolute right-full top-0'} style={{top:'-1em',right:'.25em'}}
                                 onClick={e=>{setOldWords([originWord]);setPalabra(originWord)}}>x</span>:null}
        <span onClick={e=>setOpen(!open)} className={className}>{palabra}</span>
        {open ? <Infoword
            origin={originString}
            palabrasUsadas={oldWords}
            acepciones={meaning.senses}
            antonimos={[].concat(...antonimos)}
            sinonimos={[].concat(...sinonimos)}
            addWord={addWord}/>:null}
    </span></ClickAwayListener>



}
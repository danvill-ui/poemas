import {useEffect,useState} from "react";
import {ClickAwayListener, List} from "@mui/material";
import {ListItem} from "@mui/material";
export default function ContentTooltip(props) {
    const palabra=props.palabra,
        sinonimos=[],
        antonimos=[],

        [dataRAE,setDataRAE]=useState(false),
        getDataRAE = async () =>{
            const data= await fetch('https://rae-api.com/api/words/'+palabra.replaceAll('.','').replaceAll(',','')).then((res)=>res.json()).catch(()=>{setDataRAE(null)})
           // console.log(data)
            setDataRAE( data)
    }
    useEffect(()=>{
        getDataRAE()
    },[])
        let isPrep=false
    if(!dataRAE){
        return 'Cargando'
    }
    if(!dataRAE.data){
        return 'No encuentra la palabra '+palabra
    }
    for(let el of dataRAE.data.meanings){
        const senses=el.senses
        for(let sense of senses){
            if(sense.raw.indexOf('prep.')!==-1){
                props.setPreposicion(true)
            }
            if(sense.synonyms){
                for(let word of sense.synonyms){
                    sinonimos.push(<span className={'me-1'} key={word}>{word}</span>)
                }

            }
        }

    }
    for(let el of dataRAE.data.meanings){
        const senses=el.senses
        for(let sense of senses){
            console.log(sense)
            if(sense.antonyms){
                for(let word of sense.antonyms){
                    antonimos.push(<span className={'me-1'} key={word}>{word}</span>)
                }

            }
        }

    }
    console.log(sinonimos)
    return <>
        <List dense>{dataRAE.data.meanings.map((el)=>{
        return el.senses.map((e,index)=>{
            return <><ListItem key={index} className={'text-small'}>{e.raw}</ListItem></>
        })
    })}
        {sinonimos.length? <ListItem className={'border flex flex-wrap bg-slate-200'}><h3 className={'w-full'}>Sinonimos</h3>{sinonimos}</ListItem>:null}
        {antonimos.length? <ListItem className={'border flex flex-wrap bg-slate-200 my-2'}><h3 className={'w-full'}>Antonimos</h3>{antonimos}</ListItem>:null}
    </List></>

}
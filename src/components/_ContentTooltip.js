import {useEffect,useState} from "react";
import {CircularProgress, ClickAwayListener, List} from "@mui/material";
import {ListItem} from "@mui/material";
export default function ContentTooltip(props) {
    const palabra=props.palabra,
        sinonimos=[],
        antonimos=[]
    if(!dataRAE){
        return <div className={'p-3'}><CircularProgress color="secondary"/></div>
    }
    if(!dataRAE.data){
        return 'No encuentra la palabra '+palabra
    }
    for(let el of dataRAE.data.meanings){
        const senses=el.senses
        for(let sense of senses){
            if(sense.synonyms){
                for(let word of sense.synonyms){
                    sinonimos.push(<span className={'p-1 m-1 blog bg-slate-50 text-black'} key={word}>{word}</span>)
                }
            }

        }

    }
    for(let el of dataRAE.data.meanings){
        const senses=el.senses
        for(let sense of senses){
            if(sense.antonyms){
                for(let word of sense.antonyms){
                    antonimos.push(<span className={'p-1 m-1 blog bg-slate-50 text-black text-regular font-bold'} key={word}>{word}</span>)
                }

            }
        }

    }
  //  console.log(sinonimos)
    return <>
        <List dense style={{fontSize:'1em'}}>
            {sinonimos.length? <ListItem className={'flex flex-wrap'}><h3 className={'w-full font-bold'}>Sinonimos</h3>{sinonimos}</ListItem>:null}
            {antonimos.length? <ListItem className={'flex flex-wrap'}><h3 className={'w-full font-bold'}>Antonimos</h3>{antonimos}</ListItem>:null}
            {dataRAE.data.meanings.map((el)=>{
        return el.senses.map((e,index)=>{
            return <><ListItem  className={'py-0'} key={index} style={{fontSize:'.8em'}}>{e.raw}</ListItem></>
        })
    })}

    </List></>

}
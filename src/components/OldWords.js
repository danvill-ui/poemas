import {Button} from "@mui/material";
export default function OldWords(props){
    return <div className={'p-2 flex justify-start'}>{[...new Set(props.words)].map((el,index)=>{return <Button key={index} className={'border-white text-white flex'} onClick={()=>props.addWord(el)}>{el}</Button>})}</div>
}
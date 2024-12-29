import ListItem from "@mui/material/ListItem";
import {List,Button,Tabs,Tab,Box} from "@mui/material";
import {useState} from "react";
import OldWords from "@/components/OldWords";
import {useRef,useLayoutEffect} from "react";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
             id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={'flex flex-wrap p-0 max-h-50 overflow-y-auto'}
            style={{maxHeight:'25vh'}}
            {...other}
        >
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    );
}
export default function Infoword(props){



//TODO. Tabs estructure
    const
        ref=useRef(null),
        [top,setTop]=useState(true),
        [left,setLeft]=useState(false),
        acepciones=props.acepciones,
        sinonimos=[...new Set(props.sinonimos)],
        antonimos=[...new Set(props.antonimos)],
        palabrasUsadas=props.palabrasUsadas,
        [value,setValue]=useState(0),
        handleChange=(e,value)=>{
            setValue(value)
        }
useLayoutEffect(()=>{
    const windowHeight=window.innerHeight,
        pannelHeight=ref.current.clientHeight,
        pannelWidth=ref.current.clientWidth,
        pannelTop=ref.current.getBoundingClientRect().top,
        pannelLeft=ref.current.getBoundingClientRect().left
   if(pannelTop+pannelHeight>windowHeight){
      setTop(false)
   }
   if(pannelWidth+pannelLeft>pannelWidth){
       setLeft(true)
   }
})



    return <div ref={ref} className={`absolute bg-white p-5 text-black ${top?'top-full':'bottom-full'} ${left?'left-0':'right-0'} z-10`} style={{minWidth:'40vw'}}>
        {palabrasUsadas.length>1?<OldWords words={palabrasUsadas} addWord={props.addWord}/>:null}
        {props.origin?<p className={'text-xs text-left border-b-amber-200 italic'}>{props.origin}</p>:null}
            <Tabs value={value} onChange={handleChange} >
                {acepciones.length?<Tab label= "Acepciones" value={0} className={'font-bold'}/>:null}
                {sinonimos.length?<Tab label= "Sinonimos" value={1} className={'font-bold'}/>:null}
                {antonimos.length?<Tab label= "Antónimos" value={2} className={'font-bold'}/>:null}
            </Tabs>
        <CustomTabPanel value={value} index={0}>
<List dense className={'p-0'}>
    {acepciones.map((el)=>{
        return <ListItem className={'min-w-full p-0'}>{el.raw}</ListItem>
    })}
</List>

        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
                {sinonimos.map((el)=>{
                    return <Button className={'m-1'} onClick={()=>props.addWord(el.replace('1',''))}>{el.replace('1','')}</Button>
                })}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {antonimos.map((el)=>{
                    return <Button className={'m-1'} onClick={()=>props.addWord(el)}>{el}</Button>
                })}
            </CustomTabPanel>
    </div>
}
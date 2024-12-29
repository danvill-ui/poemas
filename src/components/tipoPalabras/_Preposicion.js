
import {useState} from 'react'
import {ClickAwayListener} from "@mui/material";
import Button from '@mui/material/Button'

export default function Preposicion(props){
    const preposiciones=['a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'desde', 'durante', 'en', 'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'so', 'sobre', 'tras', 'versus' , 'vía' ],
        [open,setOpen]=useState(null),
        [preposicion,setPreposicion]=useState(props.palabra),
        [oldPreposicion,setOldPreposicion]=useState(false),
        handleClickPreposicion = (newPrep)=>{
        setPreposicion(newPrep)
            setPreposicion(newPrep)
            setOpen(false)
        }
    return <ClickAwayListener onClickAway={_=>setOpen(false)}><div className={'relative inline'}>
        <span className={'me-1'} onClick={e=>setOpen(true)}>{preposicion}</span>
        {open? <div className={'min-w-96 bg-white absolute top-100 left-100 z-10' }>
            {preposiciones.map((el)=>{
               return <Button key={el} onClick={e=>handleClickPreposicion(el)}>{el}</Button>
            })}
        </div>:null}
    </div></ClickAwayListener>
}
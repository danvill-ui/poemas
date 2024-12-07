import {Tooltip} from "@mui/material";
import ContentTooltip from "@/components/_ContentTooltip";
import Preposicion  from "@/components/tipoPalabras/_Preposicion";
import {useState} from "react";

export default function _Palabra(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState (false),
        // eslint-disable-next-line react-hooks/rules-of-hooks
        [preposicion,setPreposicion] = useState(false)

    return <Tooltip componentsProps={{
        tooltip: {
            sx: {
                bgcolor: '#fff',
                color: '#000',
                fontSize: '1em',
            },
        },
    }}
    open={open}
    title={<ContentTooltip palabra={props.significado} setPreposicion={setPreposicion} setOpen={setOpen} open={open}/>}>
        <span onClick={e => setOpen(!open)}
              className={open? 'me-1 p-1 border bg-white text-black':'me-1'}>{preposicion?<Preposicion value={props.significado}/>:props.significado}</span></Tooltip>
}
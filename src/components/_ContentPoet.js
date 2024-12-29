'use client'
import {useState} from "react";
import {Tooltip} from "@mui/material";
export default function ContentPoet() {

      const  handleClick=(e)=>{
            const selection=document.getSelection()
            const range=new Range()
            console.log(selection.toString())
            setPoem(e.target.innerText.replaceAll(selection.toString(),<Tooltip title="jandenauer" open="open">${selection.toString()}</Tooltip>))
            // alert(text)
        }
    return <h2 onDoubleClick={handleClick} dangerouslySetInnerHTML={{__html:poem}}/>
}

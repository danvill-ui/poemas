'use client'
import { useState } from "react"
import { Button } from "@mui/material"
export default function BiografiaPoeta({biografiaPoeta}){
    const [biografia,setBiografia]=useState(false)


   return <nav className={'mx-auto text-center my-5'}>
  <Button 
    label={'Biografia'} 
    onClick={() => setBiografia(!biografia)}
  >
    Biografía 
    <i className={`ph ${biografia ? 'ph-caret-up' : 'ph-caret-down'} ms-2 text-lg`} />
  </Button>
  
  {biografia ? (
    <article className={'container text-left'} dangerouslySetInnerHTML={{ __html: biografiaPoeta?.replaceAll('<br/><br/>','<br/>') }} />
  ) : null}
</nav>
}
 
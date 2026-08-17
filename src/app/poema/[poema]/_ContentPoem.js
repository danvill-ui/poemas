'use client'
import Poema from "./_Poema";

export default function ContentPoem(props){
    const {poema,relacionados}=props
return <Poema poema={poema} relacionados={relacionados}/>   

}
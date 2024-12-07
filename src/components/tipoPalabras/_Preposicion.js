export default function Preposicion(props){
    console.log(props)
    const preposiciones=['a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'desde', 'durante', 'en', 'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'so', 'sobre', 'tras', 'versus' , 'vía' ]
    return <span className={'bg-red'}>{props.value}</span>
}
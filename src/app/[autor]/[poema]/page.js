import ContentPoem from "@/app/[autor]/[poema]/_ContentPoem";
export default function pagePoem(){
    const poema={
        titulo:'Escribo y te miro',
        estrofas:[
            {versos:[
                {contenido:'Desde mi yo ideante'},
                 {contenido:'a tu yo que escucha'},{contenido:'donde se fragua la lucha'},{contenido:'entre su estado y mi cante'}]},
            {versos:[{contenido:'Tú eres sitio innombrable,'},{contenido:'Yo mi mano, la tecla.'},{contenido:'Mi idea es tu pupila que refleja'},{contenido:'las letras que por mi dedo nacen.'}]},
            {versos:[{contenido:'¡Que preocupación más grande!'},{contenido:'No saber si mi canto pueda'},{contenido:'ser vida en tu frontal meseta'},{contenido:'o muerte en mi ego valle.'}]}]
    }
            return <ContentPoem poema={poema}/>
}
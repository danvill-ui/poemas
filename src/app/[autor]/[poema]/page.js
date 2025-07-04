import ContentPoem from "@/app/[autor]/[poema]/_ContentPoem";
import Palabra from "@/components/_Palabra";
export default function pagePoem(){
    const poema=
       /* {titulo:'Exorcismo',
                estrofas:[
                        {versos:[
                            { contenido:'Aun no salió el sol' },
                            { contenido:'Solo aliento y reflejo' },
                            { contenido:'de mi propio viento' },
                                ]},
                        {versos:[
                            { contenido:'La palabra que surge' },
                            { contenido:'de mi frente esperpento' },
                            { contenido:'ni real ni inventada' },
                            { contenido:'solo tormento' }
                                ]},
                        {versos:[
                                        { contenido:'No sirve de nada' },
                                        { contenido:'escondido sustento' },
                                        { contenido:'de mi mismo infierno' },
                                        { contenido:'sin causa ni cierre' },
                                        { contenido:'abierto y presto' },
                                        { contenido:'a engañar la esperanza' },
                                        { contenido:'siendo su exacto reverso' },
                                ]},
                        {versos:[
                                        { contenido:'Dónde los besos ahora' },
                                        { contenido:'dónde las sonrisas y el vuelo' },
                                        { contenido:'dónde el amor que nace' },
                                        { contenido:'desde mí hacia mis adentros' },
                                        { contenido:'Sin refugio en mi' },
                                        { contenido:'ni en mi contexto' }
                                ]},{versos:[
                                        { contenido:'Demonio triste huye' },
                                        { contenido:'Sal pronto de este cuerpo.' },
                                        { contenido:'De mi acción concreta sacaré' },
                                        { contenido:'la fuerza para sacarte' }
                                ]}
                ]
        }*/
        {titulo:'Obsesión',
            estrofas:[
                {versos:[
                        {contenido:'Una espiral de hojas.'},
                        {contenido:'Un tornado.'},
                        {contenido:'Una manga marina con un vórtice'},
                        {contenido:'que va en busca de mi centro.'},
                        {contenido:'El puré dentro de la batidora'},
                        {contenido:'oleaje verdoso y denso.'},
                        {contenido:'Un derviche que gira con los brazos abiertos.'},
                        {contenido:'Me busca el caos etéreo de la sinapsis electrocutada,'},
                        {contenido:'nada más bajo el pie de la cama.'},
                        {contenido:'Una noria, el paso del tiempo, la historia.'},
                        {contenido:'Fuera, todo en aparente calma.'},
                        {contenido:'Dentro dos manos retuercen la ropa mojada.'},
                        {contenido:'El carrusel de montmartre'},
                        {contenido:'un giroscopio'},
                        {contenido:'la pesa de la olla'},
                        {contenido:'Mi cerebro una tienda abierta 24 horas.'},
                        {contenido:'El bolígrafo dibuja garabatos negros sobre los cuadros.'},
                        {contenido:'Un remolino engulle un barco en el mar.'},
                        {contenido:'Una vaca que pasta.'},
                        {contenido:'La cuchara que remueve el café.'},
                        {contenido:'No se para la danza macabra.'},
                        {contenido:'Los pensamientos en cadena se desgranan sobre las sábanas'},
                        {contenido:'Las manillas sobre la esfera de un reloj.'},
                        {contenido:'Una pelota extraviada.'},
                        {contenido:'El repiqueteo asonante de una gota.'},
                        {contenido:'Inagotable la fuente.'},
                        {contenido:'Alcalina la batería.'},
                        {contenido:'El divagar de una psique que resulta agotadora.'},
                    ]
                }
            ]
        }

    /*{titulo:'Luchar, amar, vivir',
        estrofas:[
            {versos:[
                    {contenido:'Desde Cabo Espartel no se ve Tánger'},
                    {contenido:'aunque lo intuyes cerca.'},
                    {contenido:'A lo lejos, Tárifa, Gibraltar y'},
                    {contenido:'más allá, lejana, Portugal.'},
                    {contenido:'Dos mares, cuatro países'},
                    {contenido:'más allá, lejana, Portugal.'},
                    {contenido:'Casi tres millones de almas'},
                    {contenido:'en la ciudad del Estrecho'},
                    {contenido:'y ventidos ojos parados junto al Faro'},
                    {contenido:'que no logran abarcarlo todo,'},
                    {contenido:'He vuelto, me digo, '},
                    {contenido:'a pesar de que sé'},
                    {contenido:'que hace un tiempo que vine'},
                    {contenido:'y aún no me he ido'}
                ]
            }
            {versos:[{contenido:'Navegar por la risa'},{contenido:'con velas profundas'},{contenido:'¡Amar!'}]},
            {versos:[{contenido:'Volar por el tiempo'},{contenido:'sin mirar hacia abajo'},{contenido:'!Vivir!'}]}
            ]}



        {titulo:'Escribo y te miro',
            estrofas:[
                {versos:[
                    {contenido:'Desde mi yo ideante'},
                     {contenido:'a tu yo que escucha'},{contenido:'donde se fragua la lucha'},{contenido:'entre su estado y mi cante'}]},
                {versos:[{contenido:'Tú eres sitio innombrable,'},{contenido:'Yo mi mano, la tecla.'},{contenido:'Mi idea es tu pupila que refleja'},{contenido:'las letras que por mi dedo nacen.'}]},
                {versos:[{contenido:'¡Que preocupación más grande!'},{contenido:'No saber si mi canto pueda'},{contenido:'ser vida en tu frontal meseta'},{contenido:'o muerte en mi ego valle.'}]}]
        }*/
    //return <h1 className={'text-center font-title text-5xl mb-10 '}>Es una prueba de que está funcionando</h1>
            return <><h1 className={'text-center font-title text-5xl mb-10'}><Palabra significado={poema.titulo}/></h1><ContentPoem poema={poema}/></>
}
"use client";
import { useState, useEffect, useRef } from "react";
import Infoword from "@/components/_infoword";
import { ClickAwayListener } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectPalabraById } from "@/lib/store/palabraSlice";
import addMeaning from "@/app/data/palabra";
import setDataRAE from "@/app/data/palabra"

export default function Palabra(props) {


  const [dataRAE, setDataRAE] = useState(props.rae ?? null);
  const [open, setOpen] = useState(false);
  const [palabra, setPalabra] = useState(props.significado);
  const [error, setError] = useState(null);
  const normalizado = props.normalizado;
  const [oldWords, setOldWords] = useState([palabra]);
  const ref = useRef(null);
  const [needsBr, setNeedsBr] = useState(null);
  const wordRedux = useSelector((state) =>
    selectPalabraById(state, props.normalizado)
  );

  const antonimos = [];
  const sinonimos = [];

  const addLocalWord = (newPalabra) => {
    const newArrayWords = oldWords.concat(newPalabra);
    setOldWords(newArrayWords);
    setPalabra(newPalabra);
  };

  const getDataRAE = async () => {
    const word = palabra.endsWith("s") ? palabra.slice(0, -1) : palabra;
    try {
      const res = await fetch("/api/rae/" + word);
      const data = await res.json();
      setDataRAE(data);
    } catch {
      setDataRAE(null);
    }
  };

  const findWord = async (palabra) => {
    if (!dataRAE) {
      try {
        const test = await fetch(`/api/rae/${normalizado}`);
        const testResult = await test.json();
        if (testResult.error) {
          console.log("suggestions =>", testResult.suggestions);
          setDataRAE(null);
          return;
        }

        dispatchEvent(setDataRAE(testResult))

        const jander = await addMeaning(normalizado);

      } catch (error) {
        console.error("Error al obtener palabra:", error);
        setError("No se pudo cargar la palabra");
      }
    }
    setOpen(!open);
  };

  const meaning = dataRAE ? dataRAE?.meanings : {};
  const origin = meaning?.origin ?? null;

  if (meaning?.senses) {
    for (let el of meaning.senses) {
      if (el.antonyms) antonimos.push(...el.antonyms);
      if (el.synonyms) sinonimos.push(...el.synonyms);
    }
  }

  console.log('dataRAE=',props.rae)
  let className =`me-1 relative tracking-wider`;
  if (open) className += " bg-white text-black";
  if (oldWords.length > 1 && oldWords[0] !== palabra) className = "border-2 p-3";
 
  const originWord = oldWords[0];
  const originString = origin ? origin.raw : null;


  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <span className="relative">
        {oldWords.length > 1 && (
          <span
            className="absolute right-full top-0"
            style={{ top: "-1em", right: ".25em" }}
            onClick={() => {
              setOldWords([originWord]);
              setPalabra(originWord);
            }}
          >
            x
          </span>
        )}

        {/* Si es un signo de puntuación, aplicamos el estilo en línea exacto para desplazarlo */}
        {/* Si es un signo de puntuación, usa tus clases exactas y el estilo inline */}
        {props.tipo === 'signo' ? (
          <span 
            className="me-1 relative tracking-wider font-medium" 
            style={{ marginLeft: '-0.25rem' }}
          >
          {props.significado}
          </span>
        ) : (
          <div onClick={() => findWord(palabra)} className={className} ref={ref}>
            {props.significado}
          </div>
        )}

        {open && props.tipo !== 'signo' && (
          <Infoword
            origin={originString}
            palabrasUsadas={oldWords}
            acepciones={meaning?.senses}
            antonimos={antonimos}
            sinonimos={sinonimos}
            addWord={addLocalWord}
          />
        )}
      </span>
    </ClickAwayListener>
  );
}
import Palabra from "@/components/_Palabra";
import { useDispatch } from "react-redux";
import { attachMany } from "@/lib/store/palabraSlice";
import { useEffect } from "react";

export default function Verso(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    //  dispatch(attachMany(props.palabras));
  }, [dispatch, props.palabras]); // dependencias correctas




  return (
    <div className=" max-w-full flex flex-wrap justify-start md:justify-center">
      {props.contenido}
    </div>
  );
}

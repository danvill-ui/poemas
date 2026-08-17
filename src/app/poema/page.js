'use client'

import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import postPoema from "../data/poema";
import EditorPoema from "@/components/editorPoema/editorPoema";

// Importaciones de Lexical
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

const theme = {
  paragraph: 'mb-2',
};

function onError(error) {
  console.error(error);
}

export default function PoemaForm() {
    const [titulo, setTitulo] = useState("");
    // Guardaremos el estado del editor como un objeto JSON serializado
    const [editorStateJSON, setEditorStateJSON] = useState("");

    // Función que captura los cambios en Lexical
    const handleEditorChange = (editorState) => {
        editorState.read(() => {
            const jsonString = JSON.stringify(editorState.toJSON());
            setEditorStateJSON(jsonString);
        });
    };

    const enviarPoema = async (event) => {
        event.preventDefault(); // Evita la recarga de la página
        debugger
        
        // Enviamos el título y el JSON estructurado del poema de Lexical
        const result = await postPoema({ 
            titulo: titulo, 
            texto: editorStateJSON // O puedes enviarlo como objeto si tu backend lo prefiere
        });
        
        console.log('Poema guardado:', result);
        return result;
    };

  

    return (
        <Box
            component="form"
            onSubmit={enviarPoema}
            className="poema flex flex-col text-center text-base border mx-2 my-auto space-y-4 p-4 bg-white rounded-lg shadow-sm"
        >
            <TextField 
                type="text" 
                placeholder="Título del poema" 
                className="mb-4"
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required 
            />

            {/* Contenedor del Editor Lexical */}
            <EditorPoema/>
            

            <Button type="submit" variant="contained" color="primary">
                Guardar Poema
            </Button>
        </Box>
    );
}
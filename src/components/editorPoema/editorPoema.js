import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  FORMAT_TEXT_COMMAND, 
  UNDO_COMMAND, 
  REDO_COMMAND, 
  $getRoot,
  $createTextNode
} from 'lexical';

import { EstrofaNode, $createEstrofaNode } from './nodes/estrofaNode';
import { VersoNode, $createVersoNode } from './nodes/versoNode';
import { WordClickPlugin } from './plugins/wordClickPlugin';
import { EnterPlugin } from './plugins/EnterPlugin';
import { PastePlugin } from './plugins/PastePlugin';

const theme = {
  paragraph: 'mb-4 text-lg font-normal font-sans',
  estrofa: 'poema-estrofa mb-6 block',
  verso: 'poema-verso block',
};

function onError(error) {
  console.error(error);
}

function InitialContentPlugin() {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      if (root.getChildrenSize() === 0) {
        const estrofa = new EstrofaNode();
        const verso = new VersoNode();
        const textNode = $createTextNode('');
        verso.append(textNode);
        estrofa.append(verso);
        root.append(estrofa);
        textNode.select(0, 0);
      }
    });
  }, [editor]);

  return null;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (formatType) => {
    editor.update(() => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    });
  };

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-3 bg-gray-50 p-2 rounded-t-md">
      <button
        type="button"
        onClick={() => formatText('bold')}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold text-sm shadow-sm"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => formatText('italic')}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-normal text-sm shadow-sm"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => formatText('underline')}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 underline text-sm shadow-sm"
      >
        U
      </button>
      <div className="h-4 w-[1px] bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm shadow-sm"
      >
        Deshacer
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm shadow-sm"
      >
        Rehacer
      </button>
    </div>
  );
}

export default function EditorPoema() {
  const initialConfig = {
    namespace: 'EditorPoesia',
    theme,
    nodes: [
      EstrofaNode,
      VersoNode,
    ],
    onError: (error) => {
    console.error(error);
    },
    // Definir el estado inicial para que comience con tu estructura
    editorState: () => {
      const root = $getRoot();
      if (root.getFirstChild() === null) {
        const estrofa = $createEstrofaNode();
        const verso = $createVersoNode();
        estrofa.append(verso);
        root.append(estrofa);
      }
    }
  };

  const manejarClicPalabra = (palabra) => {
    console.log("--- PALABRA SELECCIONADA ---", palabra);
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const jsonStructure = editorState.toJSON();
      console.log("--- ESTRUCTURA JSON LEXICAL ---", JSON.stringify(jsonStructure, null, 2));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container border rounded-lg p-4 shadow-sm bg-white">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[300px] text-lg font-normal font-sans px-2 cursor-pointer" />
          }
          placeholder={<div className="text-gray-400 select-none px-2">Escribe tu poema...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <InitialContentPlugin />
        <EnterPlugin/>
        <PastePlugin/>  
        <WordClickPlugin onWordClick={manejarClicPalabra} />
        <OnChangePlugin onChange={handleEditorChange} />
      </div>
    </LexicalComposer>
  );
}
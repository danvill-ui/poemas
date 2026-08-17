import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_HIGH, PASTE_COMMAND, $getSelection, $isRangeSelection, $createTextNode } from 'lexical';
import { VersoNode, $createVersoNode } from '../nodes/versoNode';
import { EstrofaNode, $createEstrofaNode } from '../nodes/estrofaNode';

export function PastePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event) => {
        // Extraemos el texto plano del portapapeles
        const clipboardData = event.clipboardData || window.clipboardData;
        if (!clipboardData) return false;

        const pastedText = clipboardData.getData('text/plain');
        if (!pastedText) return false;

        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;

        event.preventDefault();

        editor.update(() => {
          // Normalizamos los saltos de línea (por si vienen de Windows \r\n o Mac \r)
          const lineas = pastedText.replace(/\r\n/g, '\n').split('\n');

          // Creamos la jerarquía inicial a partir del texto pegado
          // Una estrofa se separa por líneas vacías (""). Los versos son líneas con contenido.
          const estrofasArray = [];
          let versoActual = [];

          lineas.forEach((linea) => {
            if (linea.trim() === '') {
              // Si hay una línea vacía, cerramos la estrofa actual (si tiene versos)
              if (versoActual.length > 0) {
                estrofasArray.push(versoActual);
                versoActual = [];
              }
            } else {
              versoActual.push(linea);
            }
          });
          // Añadir la última estrofa si quedó pendiente
          if (versoActual.length > 0) {
            estrofasArray.push(versoActual);
          }

          // Si el texto pegado no tenía ningún contenido válido, salimos
          if (estrofasArray.length === 0) return;

          // Construimos los nodos reales de Lexical
          const primerEstrofaNode = $createEstrofaNode();
          let primerVersoCreado = null;
          const nodosAInsertar = [];

          estrofasArray.forEach((versosTexto, indexEstrofa) => {
            const estrofaNode = indexEstrofa === 0 ? primerEstrofaNode : $createEstrofaNode();

            versosTexto.forEach((textoVerso, indexVerso) => {
              const versoNode = $createVersoNode();
              versoNode.append($createTextNode(textoVerso));
              estrofaNode.append(versoNode);

              if (!primerVersoCreado) {
                primerVersoCreado = versoNode;
              }
            });

            nodosAInsertar.push(estrofaNode);
          });

          // Insertamos la estructura generada en la selección actual
          // (Si hay selección, podemos reemplazarla o insertar en el punto exacto)
          const anchorNode = selection.anchor.getNode();
          let versoNodeActual = anchorNode;
          while (versoNodeActual !== null && !(versoNodeActual instanceof VersoNode)) {
            versoNodeActual = versoNodeActual.getParent();
          }

          if (versoNodeActual instanceof VersoNode) {
            // Reemplazamos/Insertamos después del verso actual donde está el cursor
            let currentInsertNode = versoNodeActual.getParent(); // Estrofa actual
            
            nodosAInsertar.forEach((estrofaNode) => {
              if (currentInsertNode && currentInsertNode instanceof EstrofaNode) {
                currentInsertNode.insertAfter(estrofaNode);
                currentInsertNode = estrofaNode;
              } else {
                versoNodeActual.insertAfter(estrofaNode);
              }
            });

            // Opcional: limpiar el verso original si estaba vacío donde se pegó
            if (versoNodeActual.getTextContent().trim() === '' && versoNodeActual.getChildrenSize() === 0) {
              versoNodeActual.remove();
            }
          }
        });

        return true; // Indicamos que hemos manejado el comando de pegado
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
}
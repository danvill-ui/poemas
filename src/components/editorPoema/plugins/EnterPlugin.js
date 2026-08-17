import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { VersoNode, $createVersoNode } from '../nodes/versoNode';
import { EstrofaNode, $createEstrofaNode } from '../nodes/estrofaNode';

export function EnterPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) && selection.isCollapsed()) {
          const anchorNode = selection.anchor.getNode();
          const anchorOffset = selection.anchor.offset;
          
          let versoNode = anchorNode;
          while (versoNode !== null && !(versoNode instanceof VersoNode)) {
            versoNode = versoNode.getParent();
          }

          if (versoNode instanceof VersoNode) {
            if (event) {
              event.preventDefault();
            }

            editor.update(() => {
              const isShift = event && event.shiftKey;

              // 1. Preparar el nuevo contenedor (Nuevo verso o Nueva estrofa)
              const nuevoVerso = $createVersoNode();
              let contenedorDestino = nuevoVerso;

              if (!isShift) {
                // Enter normal: Creamos estrofa con un verso dentro
                const nuevaEstrofa = $createEstrofaNode();
                nuevaEstrofa.append(nuevoVerso);
                contenedorDestino = nuevaEstrofa; // El marcador para insertar en el árbol
              }

              // 2. Manejar la división del texto si estamos dentro de un nodo de texto
              if (anchorNode.getType() === 'text') {
                // Dividimos el texto en el punto exacto del cursor
                const [leftText, rightText] = anchorNode.splitText(anchorOffset);
                
                // Recogemos todos los hermanos que queden a la derecha del cursor dentro del verso actual
                let nextSibling = leftText.getNextSibling();
                
                // Si el nodo derecho tiene contenido real, lo pasamos al nuevo verso
                if (rightText && rightText.getTextContent().length > 0) {
                  nuevoVerso.append(rightText);
                } else if (rightText) {
                  // Si está vacío (estábamos al final del texto), lo removemos para que no ensucie
                  rightText.remove();
                }

                // Movemos el resto de nodos hermanos que estaban a la derecha
                while (nextSibling !== null) {
                  const nodeToMove = nextSibling;
                  nextSibling = nextSibling.getNextSibling();
                  nuevoVerso.append(nodeToMove);
                }
              }

              // 3. Insertar en el árbol según corresponda
              if (isShift) {
                // Shift + Enter: Inserta el nuevo verso justo después del actual
                versoNode.insertAfter(nuevoVerso);
                nuevoVerso.select();
              } else {
                // Enter normal: Encuentra la estrofa actual e inserta la nueva estrofa debajo
                let estrofaActual = versoNode.getParent();
                while (estrofaActual !== null && !(estrofaActual instanceof EstrofaNode)) {
                  estrofaActual = estrofaActual.getParent();
                }

                const nuevaEstrofa = contenedorDestino; // Es el EstrofaNode
                if (estrofaActual instanceof EstrofaNode) {
                  estrofaActual.insertAfter(nuevaEstrofa);
                } else {
                  versoNode.insertAfter(nuevaEstrofa);
                }
                
                nuevoVerso.select(0, 0);
              }
            });

            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
}
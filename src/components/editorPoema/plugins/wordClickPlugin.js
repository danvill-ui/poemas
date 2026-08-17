import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode, $isTextNode } from 'lexical';

export function WordClickPlugin({ onWordClick }) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerRootListener((rootElement) => {
      if (!rootElement) return;

      let touchTimer = null;

      const extractWordAtPosition = (clientX, clientY) => {
        let range;
        if (document.caretRangeFromPoint) {
          range = document.caretRangeFromPoint(clientX, clientY);
        } else if (document.createRange && event.rangeParent) {
          range = document.createRange();
          range.setStart(event.rangeParent, event.rangeOffset);
        }

        if (!range) return;

        editor.update(() => {
          const domNode = range.startContainer;
          const lexicalNode = $getNearestNodeFromDOMNode(domNode);

          if (lexicalNode && $isTextNode(lexicalNode)) {
            const textContent = lexicalNode.getTextContent();
            const offset = range.startOffset;

            let start = offset;
            while (start > 0 && /\S/.test(textContent.charAt(start - 1))) {
              start--;
            }

            let end = offset;
            while (end < textContent.length && /\S/.test(textContent.charAt(end))) {
              end++;
            }

            const palabra = textContent.slice(start, end).trim();

            if (palabra.length > 0) {
              onWordClick(palabra);
            }
          }
        });
      };

      // 1. Escritorio: Doble clic
      const handleDoubleClick = (event) => {
        extractWordAtPosition(event.clientX, event.clientY);
      };

      // 2. Móvil: Mantener pulsado (Long Press) para evitar conflictos con el toque simple de mover el cursor
      const handleTouchStart = (event) => {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        
        touchTimer = setTimeout(() => {
          extractWordAtPosition(touch.clientX, touch.clientY);
        }, 500); // 500ms manteniendo el dedo para activar
      };

      const handleTouchEnd = () => {
        if (touchTimer) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
      };

      rootElement.addEventListener('dblclick', handleDoubleClick);
      rootElement.addEventListener('touchstart', handleTouchStart);
      rootElement.addEventListener('touchend', handleTouchEnd);
      rootElement.addEventListener('touchmove', handleTouchEnd); // Si mueve el dedo, cancelamos

      return () => {
        rootElement.removeEventListener('dblclick', handleDoubleClick);
        rootElement.removeEventListener('touchstart', handleTouchStart);
        rootElement.removeEventListener('touchend', handleTouchEnd);
        rootElement.removeEventListener('touchmove', handleTouchEnd);
      };
    });
  }, [editor, onWordClick]);

  return null;
}
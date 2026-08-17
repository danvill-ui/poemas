import { ElementNode, $createTextNode } from 'lexical';
import { EstrofaNode } from './estrofaNode';

export class VersoNode extends ElementNode {
  static getType() {
    return 'verso';
  }

  static clone(node) {
    return new VersoNode(node.__key);
  }

  createDOM() {
    const dom = document.createElement('p');
    dom.className = 'verso-poema m-0 leading-relaxed'; // Tus estilos para el verso
    return dom;
  }

  updateDOM(prevNode, dom) {
    return false;
  }

  insertNewAfter(selection, restoreSelection = true) {
    const newVerso = $createVersoNode();
    const parent = this.getParent();
    
    // Si estamos en una estrofa, creamos el verso dentro de la misma estrofa
    if (parent) {
      this.insertAfter(newVerso, restoreSelection);
    }
    return newVerso;
  }

  static importJSON(serializedNode) {
    return new VersoNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'verso',
      version: 1,
    };
  }
}



export function $createVersoNode() {
  return new VersoNode();
}
import { ElementNode } from 'lexical';

export class EstrofaNode extends ElementNode {
  static getType() {
    return 'estrofa';
  }

  static clone(node) {
    return new EstrofaNode(node.__key);
  }

  createDOM() {
    const dom = document.createElement('div');
    dom.className = 'estrofa-poema mb-4'; // Tus estilos para la estrofa
    return dom;
  }

  updateDOM(prevNode, dom) {
    return false;
  }

  static importJSON(serializedNode) {
    return new EstrofaNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'estrofa',
      version: 1,
    };
  }
}

export function $createEstrofaNode() {
  return new EstrofaNode();
}
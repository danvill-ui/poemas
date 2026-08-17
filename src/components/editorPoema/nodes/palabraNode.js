import { ElementNode, TextNode } from 'lexical';
export class PalabraNode extends TextNode {
    static getType() {
        return 'palabra';
    }

    static clone(node) {
        return new PalabraNode(node.__text, node.__key);
    }

    createDOM(config) {
        const dom = super.createDOM(config);
        dom.className = 'poema-palabra'; // Útil para eventos (clics, diccionario, etc.)
        return dom;
    }
}
import { detect } from '../shared/utility';

let anchor = 0;

function find(): HTMLElement | null {
  const map = new Map<HTMLElement, number>();

  for (let p of document.querySelectorAll('p') as NodeListOf<HTMLElement>) {
    if (p.childNodes.length) {
      let weight = 1 << 14;
      while (p) {
        map.set(p, (map.get(p) || 0) + weight);
        p = p.parentElement;
        weight >>= 1;
      }
    }
  }
  let [root, weight] = [null, 0];
  for (const [_root, _weight] of map.entries()) {
    if (_weight > weight) {
      weight = _weight;
      root = _root;
    }
  }
  return root;
}

function mark(char: string) {
  if (char === '-') {
    return 0b100;
  }
  switch (detect(char)) {
    case 0:
      return 0b100;
    case 1:
      return 0b1;
    case 2:
      return 0b10;
  }
}

function mask(node: Node) {
  if (node.nodeType !== Node.TEXT_NODE) {
    for (const child of Array.from(node.childNodes)) {
      if (
        ![
          'script',
          'head',
          'style',
          'iframe',
          'view',
          'img',
          'canvas',
          'audio',
        ].includes(node.nodeName.toLowerCase())
      ) {
        mask(child);
      }
    }
  } else {
    const text = node.nodeValue;
    const spans = [];
    let start = 0;
    let flag = 0b111;
    const spanOf = (text: string) => {
      if (flag & 3) {
        const span = document.createElement('span');
        span.classList.add(`lanx-span-${anchor++ % 2}`);
        span.setAttribute(
          'style',
          'display: inline; float: none; width: auto; padding: 0; margin: 0; line-height: inherit; font: inherit'
        );
        span.innerText = text;
        spans.push(span);
      } else {
        spans.push(document.createTextNode(text));
      }
    };
    for (let i = 0; i < text.length; i++) {
      const f = mark(text.charAt(i));
      if (!(f & flag) || (flag === 0b10 && i - start > 1)) {
        spanOf(text.slice(start, i));
        start = i;
      }
      flag = f;
    }
    spanOf(text.slice(start));
    if (spans.some(span => span.nodeType !== Node.TEXT_NODE)) {
      // @ts-ignore
      node.replaceWith(...spans);
    }
  }
}

export default function() {
  if (anchor === 0) {
    const root = find();
    if (root) {
      mask(root);
      anchor = 3;
    }
  } else {
    document.body.classList.remove(`lanx-mask-${anchor++ % 3}`);
  }
  document.body.classList.add(`lanx-mask-${anchor % 3}`);
}

let anchor = 0;

function find(): HTMLElement | null {
  const findParent = (e1: HTMLElement, e2: HTMLElement) => {
    const parents = [];
    while (e1) {
      parents.push(e1);
      e1 = e1.parentElement;
    }
    while (e2) {
      if (parents.find(e => e === e2)) {
        return e2;
      }
      e2 = e2.parentElement;
    }
    return null;
  };
  const es = document.querySelectorAll('p') as NodeListOf<HTMLElement>;
  if (es.length) {
    return Array.from(es).reduce((e1, e2) => {
      return e1 && findParent(e1, e2);
    });
  }
  return null;
}

function mark(char) {
  if (/[a-zA-Z]/.test(char)) {
    return 0b1;
  }
  if (/[\u4E00-\u9FA5]/.test(char)) {
    return 0b10;
  }
  return 0b100;
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
      if (!(f & flag) || flag === 0b10) {
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

// TODO: tree into each text node to create range
// `childNodes`, `Node.TEXT_NODE`, `Node.ELEMENT_NODE`
function departArray<T>(array: T[], item: T) {
  const index = array.findIndex(i => i === item);
  if (index < 0) {
    return [[], []];
  }
  return [array.slice(0, index), array.slice(index + 1)];
}
function treeTextNodes(ranges: Range[], nodes: Node[]) {
  for (const node of nodes.filter(n => n)) {
    if (node.nodeType === Node.TEXT_NODE) {
      // FIXING: avoid to insert extra elements,
      // extra elements may break the CSS layout
      if (node.nodeValue.trim()) {
        const rs = document.createRange();
        rs.setStartBefore(node);
        rs.setEndAfter(node);
        ranges.push(rs);
      }
    } else {
      treeTextNodes(ranges, Array.from(node.childNodes));
    }
  }
}

function getTextRanges(rootRange: Range) {
  const rootNode = rootRange.commonAncestorContainer;
  const [ns, ne, ranges] = [[] as Node[], [] as Node[], [] as Range[]];

  // Start >><>>...
  for (let n = rootRange.startContainer; n && n != rootNode; n = n.parentNode) {
    ns.push(n);
  }
  for (let i = 0; i < ns.length; i++) {
    if (i) {
      const nodes = Array.from(ns[i].childNodes);
      treeTextNodes(ranges, departArray(nodes, ns[i - 1])[1]);
    } else {
      const rs = document.createRange();
      rs.setStart(ns[i], rootRange.startOffset);
      rs.setEndAfter(ns[i]);
      ranges.push(rs);
    }
  }

  // End ...<<><<
  for (let n = rootRange.endContainer; n && n != rootNode; n = n.parentNode) {
    ne.push(n);
  }
  for (let i = 0; i < ne.length; i++) {
    if (i) {
      const nodes = Array.from(ne[i].childNodes);
      treeTextNodes(ranges, departArray(nodes, ne[i - 1])[0]);
    } else {
      const re = document.createRange();
      re.setStartBefore(ne[i]);
      re.setEnd(ne[i], rootRange.endOffset);
      ranges.push(re);
    }
  }

  // Middle ...<<>><>...
  if (ns.length || ne.length) {
    let nodes: Node[] = Array.from(rootNode.childNodes);
    if (ns.length) {
      nodes = departArray(nodes, ns[ns.length - 1])[1];
    } else {
      nodes = [];
    }
    if (ne.length) {
      nodes = departArray(nodes, ne[ne.length - 1])[0];
    } else {
      nodes = [];
    }
    treeTextNodes(ranges, nodes);
  } else {
    return [rootRange];
  }

  // Send to caller
  return ranges;
}

function highlightTextRange(range: Range) {
  // const hlcolours = ['yellow'];
  const span = document.createElement('span');
  span.setAttribute(
    'style',
    // `background-color: ${hlcolours[Date.now() % hlcolours.length]}`
    'background-color: #FFDF61; display: inline; float: none; width: auto'
  );
  range.surroundContents(span);
}

export default function highlightSelection() {
  const rootRange = window.getSelection().getRangeAt(0);
  const textRanges = getTextRanges(rootRange);
  for (const range of textRanges) {
    highlightTextRange(range);
  }
  if (window.getSelection().empty) {
    // Chrome
    window.getSelection().empty();
  } else if (window.getSelection().removeAllRanges) {
    // Firefox
    window.getSelection().removeAllRanges();
  }
}

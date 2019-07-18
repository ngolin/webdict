function getSafeRanges(dangerous) {
  let a = dangerous.commonAncestorContainer;
  // Starts -- Work inward from the start, selecting the largest safe range
  let s = new Array(0);
  let rs = new Array(0);
  if (dangerous.startContainer != a)
    for (let i = dangerous.startContainer; i != a; i = i.parentNode) s.push(i);
  if (0 < s.length)
    for (let i = 0; i < s.length; i++) {
      let xs = document.createRange();
      if (i) {
        xs.setStartAfter(s[i - 1]);
        xs.setEndAfter(s[i].lastChild);
      } else {
        xs.setStart(s[i], dangerous.startOffset);
        xs.setEndAfter(s[i].nodeType == Node.TEXT_NODE ? s[i] : s[i].lastChild);
      }
      rs.push(xs);
    }

  // Ends -- basically the same code reversed
  let e = new Array(0);
  let re = new Array(0);
  if (dangerous.endContainer != a) {
    for (let i = dangerous.endContainer; i != a; i = i.parentNode) {
      e.push(i);
    }
  }
  if (0 < e.length)
    for (let i = 0; i < e.length; i++) {
      let xe = document.createRange();
      if (i) {
        xe.setStartBefore(e[i].firstChild);
        xe.setEndBefore(e[i - 1]);
      } else {
        xe.setStartBefore(
          e[i].nodeType == Node.TEXT_NODE ? e[i] : e[i].firstChild
        );
        xe.setEnd(e[i], dangerous.endOffset);
      }
      re.unshift(xe);
    }

  // Middle -- the uncaptured middle
  if (0 < s.length && 0 < e.length) {
    let xm = document.createRange();
    xm.setStartAfter(s[s.length - 1]);
    xm.setEndBefore(e[e.length - 1]);
    rs.push(xm);
  } else {
    return [dangerous];
  }

  // Send to Console
  return rs.concat(re);
}
function highlightRange(range) {
  // const hlcolours = ['yellow'];
  let newNode = document.createElement('span');
  newNode.setAttribute(
    'style',
    // `background-color: ${hlcolours[Date.now() % hlcolours.length]}`
    'background-color: yellow'
  );
  range.surroundContents(newNode);
}

export default function highlightSelection() {
  let userSelection = window.getSelection().getRangeAt(0);
  let safeRanges = getSafeRanges(userSelection);
  for (let i = 0; i < safeRanges.length; i++) {
    highlightRange(safeRanges[i]);
  }
}

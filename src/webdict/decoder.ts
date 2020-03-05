const ipal = ' -(-(r)-)-aɪ-aʊ-b-d-dʒ-e-eə-eɪ-f-h-i-iː-j-juː-k-l-m-n-oʊ-p-r-s-t-tʃ-u-uː-v-w-x-z-æ-ð-ŋ-ɑ-ɑː-ɒ-ɔɪ-ɔː-ə-ər-əʊ-ɜː-ɡ-ɪ-ɪə-ʃ-ʊ-ʊə-ʌ-ʒ-ˈ-ˌ-θ'.split(
  '-'
);
const secretKey = 'AabcdeBCfDghEFGiHjIJKLkMNOPlQmRSTUVWXYnZop0qrs12t34u56789';

function _dePron(input: string): [string, string] {
  let output = '',
    mark = '';
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    output += ipal[secretKey.indexOf(char)];
    mark += char >= 'a' ? '-' + char : char;
  }
  mark = secretKey.charAt((output.length - 1) % secretKey.length) + mark;
  return [output, mark.toUpperCase()];
}

export function dePron(input: string, lang: string) {
  const prons = input.split(', ');
  let output = '';
  for (let i = 0; i < prons.length; i++) {
    if (i > 0) output += ', ';
    let p = prons[i];
    if (p.charAt(0) === '[') {
      p = p.substr(1);
      output += '[';
    }
    const suffix = p.charAt(p.length - 1) === ']';
    if (suffix) p = p.substring(0, p.length - 1);
    const pronMark = _dePron(p);
    output += `<span class="lanx-pron-play" data-code="${lang + pronMark[1]}">${
      pronMark[0]
    }</span>`;
    if (suffix) output += ']';
  }
  return output;
}

const mask = 'aāáǎàoōóǒòeēéěèiīíǐìuūúǔùüǖǘǚǜ';

function _dPinv(pinv: string) {
  if (/^[a-z]{1,6}[0-5]$/.test(pinv)) {
    const pv = 'nue:nüe lue:lüe nv:nü lv:lü v:ü'
      .split(' ')
      .map(x => x.split(':'))
      .reduce((pinv, [b, a]) => pinv.replace(b, a), pinv);
    for (let i = 0; i < pv.length; i++) {
      const pin = mask.indexOf(pv.charAt(i));
      if (pin >= 0) {
        const tone = parseInt(pv.slice(-1)) % 5;
        return pv.slice(0, i) + mask.charAt(pin + tone) + pv.slice(i + 1, -1);
      }
    }
  }
  return pinv;
}
export function dePinv(pinv: string, lang: string) {
  return pinv
    .split(';')
    .map(x => x.trim())
    .filter(Boolean)
    .map(pinv => {
      const pinvs = pinv
        .split(',')
        .map(x => x.trim())
        .filter(Boolean);
      let __pinv__ = null;
      return pinvs
        .map((pinv, i) => {
          const each = pinv =>
            pinv
              .split(' ')
              .map(x => x.trim())
              .filter(Boolean)
              .map(
                pinv =>
                  `<span class="lanx-pron-play" data-code="${lang +
                    pinv}">${pinv
                    .split('-')
                    .map(pinv => _dPinv(pinv))
                    .join(' ')}</span>`
              )
              .join(' ');
          if (i === 0) {
            const data = { '<': '繁体', '>': '简体', '=': '正体' };
            for (const mark of '<>=') {
              if (pinv.includes(mark)) {
                const i = pinv.indexOf(mark);
                const t = pinv.slice(i + 1).trim();
                __pinv__ = pinv.slice(0, i).trim();
                return `${each(__pinv__)}<span title="${
                  data[mark]
                }：${t.replace(/"/g, '&quot;')}"> ※</span>`;
              }
            }
            return each((__pinv__ = pinv));
          } else if (i === 1) {
            return `${each(pinv)}<span title="「${(__pinv__ = __pinv__
              .split(' ')
              .map(x => x.trim())
              .filter(Boolean)
              .map(pinv =>
                pinv
                  .split('-')
                  .map(pinv => _dPinv(pinv))
                  .join(' ')
              )
              .join(' '))}」的异读音"> ※</span>`;
          } else {
            return `${each(
              pinv
            )}<span title="「${__pinv__}」的异读音"> ※</span>`;
          }
        })
        .join(', ');
    })
    .join('; ');
}

// function _dePinv(input: string, lang: string) {
//   const pv = 'nue:nüe lue:lüe nv:nü lv:lü v:ü'.split(' ')
//     .map(x => x.split(':')).reduce((input, [b, a]) => input.replace(b, a), input);
//   for (let i = 0; i < pv.length; i++) {
//     const pin = mask.indexOf(pv.charAt(i));
//     if (pin >= 0) {
//       const end = pv.length - 1;
//       let tone = pv.charCodeAt(end) - 48;
//       if (tone === 5) tone = 0;
//       return `<span class="lanx-pron-play" data-code="${lang + input}">${pv.substr(0, i) + mask.charAt(pin + tone) + pv.substring(i + 1, end)}</span>`;
//     }
//   }
//   return input;
// }

// export function dePinv(input: string, lang: string): string {
//   const res = input.match(/\b[a-z]{1,6}[1-5]\b/);
//   if (res === null) return input;
//   const rem = (res.index || 0) + res[0].length;
//   if (rem === input.length) return input.substr(0, res.index) + _dePinv(res[0], lang);
//   return input.substr(0, res.index) + _dePinv(res[0], lang) + dePinv(input.substr(rem), lang);
// }

function _deJyut(jyut: string, end: string) {
  if (/^[a-z]+[1-6]$/.test(jyut)) {
    const yut1 = Array.from(
      /^(n?[bpmfdtlgkhzcsj]?w?)([aeiouy]?.*)([1-6])$/i.exec(jyut)
    ).slice(1);
    return yut1
      .map((j, i) =>
        j
          ? `<span class="lanx-jyut-${i + 1}">${j}${
              i === yut1.length - 1 ? end : ''
            }</span>`
          : ''
      )
      .join('');
  }
  return jyut + end;
}

export function deJyut(jyut: string, lang: string) {
  const yut1 = jyut
    .split(';')
    .map(jyut => jyut.trim())
    .filter(jyut => jyut);
  return yut1
    .map((jyut, i1) => {
      const end1 = (i1 + 1 !== yut1.length && ';') || '';
      const yut2 = jyut
        .split(',')
        .map(jyut => jyut.trim())
        .filter(jyut => jyut);
      return yut2
        .map((jyut, i2) => {
          const end2 = (i2 + 1 !== yut2.length && ',') || '';
          return jyut
            .split(' ')
            .filter(jyut => jyut)
            .map(jyut => {
              const yut3 = jyut.split('-').filter(jyut => jyut);
              return `<span class="lanx-pron-play" data-code="${lang + jyut}"${
                i2 !== 0
                  ? `title="「${yut2[0].replace(/-/g, ' ')}」的異讀音"`
                  : ''
              }>${yut3
                .map(
                  (jyut, i3) =>
                    _deJyut(jyut, i3 + 1 === yut3.length && (end2 || end1)) ||
                    ''
                )
                .join(' ')}</span>`;
            })
            .join(' ');
        })
        .join(' ');
    })
    .join(' ');
}

// export function encode(input: string): string {
//   let i = 0;
//   let output = '';
//   while (i < input.length) {
//     const [sub, len] = find(input.substr(i, i + 3));
//     output += sub;
//     i += len;
//   }
//   return output;
// }

// function find(ipa: string): [string, number] {
//   let high = ipal.length - 1;
//   let low = 0;
//   while (low <= high) {
//     const mid = (low + high) >> 1;
//     if (ipal[mid] === ipa) {
//       return [secretKey[mid], ipa.length];
//     } else if (ipal[mid] < ipa) {
//       low = mid + 1;
//     } else high = mid - 1;
//   }
//   if (ipa.length === 1) {
//     throw ipa;
//   }
//   return find(ipa.substr(0, ipa.length - 1));
// }

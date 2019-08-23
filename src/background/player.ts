import { PageScriptData } from '../shared/types';
import { Cache } from './cache';
import { host } from '../fetch';
const URLXD = {
  zh: [`${host}/static/pron/zh/`, `.ogg`],
  uk: [`${host}/static/pron/uk/`, `.mp3`],
  us: [`${host}/static/pron/us/`, `.mp3`],
  jp: [`${host}/static/pron/jp/`, `.wav`],
};

const cache = new Cache<HTMLAudioElement>(128);
/**
 * `id` formats:
 *
 * 1. `zh:pin1.ogg`
 * 2. `uk:C7IZLO-RJ.mp3`
 * 3. `us:F7I-NLO-KJ.mp3`
 *
 * `onerror` when playing failed.
 */
export default function play(
  { code }: PageScriptData.Playme,
  onerror: (data: PageScriptData.Playme) => void
) {
  const oldAudio = cache.get(code);
  if (oldAudio) {
    if (oldAudio.getAttribute('disabled')) {
      if (onerror) onerror({ code });
    } else {
      oldAudio.play();
    }
  } else {
    const newAudio = document.createElement('audio');
    cache.add(code, newAudio);
    newAudio.preload = 'auto';
    newAudio.autoplay = true;
    const [lang, url] = code.split(':');
    if (URLXD[lang]) {
      const [a, b] = URLXD[lang];
      newAudio.src = a + url + b;
    }
    newAudio.onerror = (event: ErrorEvent) => {
      event.stopPropagation();
      newAudio.setAttribute('disabled', 'disabled');
      if (onerror) onerror({ code });
    };
  }
}

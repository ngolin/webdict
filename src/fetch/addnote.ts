import { PageScriptData } from '../shared/types';

import fetch from './_';

export default ({ note, furl }: PageScriptData.AddNote) =>
  fetch('/app/v1/addnote', { note, furl });

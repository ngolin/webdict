import fetch from './_';

export default ({username, password}) =>
  fetch('/app/v1/check/in', {username, password});

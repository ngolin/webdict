import fetch from './_';

export default ({username}) =>
  fetch('/app/v1/check', {
    username
  });

import fetch from './_';

export default ({username, password}) => fetch('/app/v1/signin', {username, password});

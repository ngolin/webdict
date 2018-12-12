import fetch from './_';

export default ({
  username,
  password,
  passhint,
  gender,
  birday
}) => fetch('/app/v1/signin', {
  username,
  password,
  passhint,
  gender,
  birday
});
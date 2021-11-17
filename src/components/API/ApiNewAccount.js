// /src/components/API/ApiNewAccount.js 

/* submits form for new account on UserDb */

import Alert from '@material-ui/lab/Alert';

export default function ApiNewAccount(values) {
  const responseToken = JSON.parse(localStorage.getItem('tokenAPI'));

  console.log('received for API', responseToken);
  return fetch(values.apiurl, {
    method: 'POST',
    body: JSON.stringify({
      email: values.email,
      hostname: values.userurl,
      token: responseToken
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert('BCODB says: ' + data.message + ' Token: ' + data.token);
      localStorage.removeItem('tokenAPI');
    })
    .catch((error) => {
      // TODO: This needs to be fleshed out to get all errors and deal with them
      alert(`Something went wrong. Most likely that username already exists. ${error}`);
      console.log('error', error);
      // return error;
    });

}

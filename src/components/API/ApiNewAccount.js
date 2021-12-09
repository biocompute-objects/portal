// /src/components/API/ApiNewAccount.js

/* submits form for new account on UserDb */

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
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            console.log('data', data);
            alert(`BCODB says: ${data.message}`);
          });
      }
    })
    .catch((error) => {
      // TODO: This needs to be fleshed out to get all errors and deal with them
      alert(`Something went wrong. ${error}`);
      console.log('error', error);
      // return error;
    });
}

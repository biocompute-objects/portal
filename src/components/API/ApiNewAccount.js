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
      if (response.ok) {
        return response;
      }
      if (response.status === 409) {
        alert(`${values.apiurl} says: An account with that email is awaiting activation.`);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => {
      alert(`${values.apiurl} says: Something went wrong. ${error}`);
      console.log('error', error);
    });
}

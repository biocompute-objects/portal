// /src/components/API/UserdbConfirmPasswordReset.js

/* Returns a JSON Web Token that can be used for authenticated requests. */

export default function UserdbConfirmPasswordReset(values) {
  fetch(`${values.userdb}password_reset/confirm/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: values.password,
      token: values.token
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            alert('Your password has been reset.');
            console.log('data', data);
            window.location.href = '/login';
          });
      }
    })
    .catch((error) => {
      // TODO: This needs to be fleshed out to get all errors and deal with them
      alert(`Unable to locate an account with those provided credentials. ${error}`);
      console.log('error', error);
      // return error;
    });
}

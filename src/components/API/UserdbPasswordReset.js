// /src/components/API/UserdbPasswordReset.js

/* Returns a JSON Web Token that can be used for authenticated requests. */

export default function UserdbPasswordReset(values, setAlternateView, alternateView) {
  fetch(`${values.userdb}password_reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: values.email
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            alert('A password reset email has been sent to the provided email address.');
            console.log('data', alternateView);
            setAlternateView(true);
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

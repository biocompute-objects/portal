// /src/components/API/UserdbTokenAuth.js

/* Returns a JSON Web Token that can be used for authenticated requests. */

export default function UserdbTokenAuth(values) {
  fetch(values.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: values.username,
      password: values.password
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/';
          });
      }
    })
    .catch((error) => {
      // TODO: This needs to be fleshed out to get all errors and deal with them
      alert(`Unable to log in with provided credentials. ${error}`);
      console.log('error', error);
      // return error;
    });
}

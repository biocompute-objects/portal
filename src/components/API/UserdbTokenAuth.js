// /src/components/API/UserdbTokenAuth.js

/* Returns a JSON Web Token that can be used for authenticated requests. */
import Alert from '@material-ui/lab/Alert';

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
    .then((response) => response.json())
    .then((json) => {
      console.log('json: ', json)
      if (typeof (json.user) !== 'undefined') {
      // Set the user information.
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
	  window.location.href = '/';
      } else {
        // Bad login.
        alert('Login Failed. Try again');
        // window.location.reload(false);
      }
    });
}

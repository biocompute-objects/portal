// /src/components/API/TokenVerify.js

/* Verifies JSON Web Token that can be used for authenticated requests. */

export default function TokenVerify(isLoggedIn, setIsLoggedIn, sending) {
  const jwtToken = localStorage.getItem('token');
  console.log('token', jwtToken);
  fetch(sending.userdb_tokenverify, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: jwtToken
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((data) => {
            setIsLoggedIn(true);
          });
      } if (response.status === 400) {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Session Expired. Please log in again.');
      }
      // throw new Error(response.status);
    })
    .catch((error) => {
      // TODO: This needs to be fleshed out to get all errors and deal with them
      console.log('error', error);
      return error;
    });
}

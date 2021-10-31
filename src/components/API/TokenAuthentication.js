// /src/components/API/TokenAuthentication.js 

/* Retrievs a draft object using the current user's token and an object's 
draft id */
import { useContext } from 'react';
import { FetchContext } from '../../App';

export default function TokenAuthentication( values ) {
    // Fetch context.
    const fc = useContext(FetchContext);
	
    fetch(fc.sending.userdb_tokenauth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password
      })
    })
    .then((res) => res.json())
    .then((json) => {
        if (typeof (json.user) !== 'undefined') {
          // Set the user information.
          localStorage.setItem('token', json.token);
          localStorage.setItem('user', JSON.stringify(json.user));
        } else {
          // Bad login.

        }
      });
  }
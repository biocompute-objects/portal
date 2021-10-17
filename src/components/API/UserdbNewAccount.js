// /src/components/API/UserdbNewAccount.js 

/* submits form for new account on UserDb */

import Alert from '@material-ui/lab/Alert';
export default function UserdbNewAccount( values ) {
let responseData = ''

  console.log("recieved for userdb", values)
  fetch(values.userurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: values.username,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
        profile: {
            username: values.username,
            public: false,
            affiliation: '',
            orcid: '',
        }
    })
  })
  .then((res) => res.json().then((data) => ({
    data,
    status: res.status
  })).then((res) => {
    localStorage.setItem('tokenAPI', JSON.stringify(res.data.token))
    // Show the success message for a couple of seconds.
  })
  .catch((error) => {
      alert("Something went wrong. Most likley that username already exists.", error);
      console.log('error', error)
      return error;
  })
);
}
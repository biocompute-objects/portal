// /src/components/API/UserdbNewAccount.js

/* submits form for new account on UserDb */

import Alert from '@material-ui/lab/Alert';

export default function UserdbNewAccount(values) {
  // let responseData = '';

  console.log('received for userdb', values);
  return fetch(values.userurl, {
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
        orcid: ''
      }
    })
  }).then((res) => res.json().then((data) => ({
    data,
    status: res.status
  })).then((res_) => {
    alert('Portal Account created! Do not forget to activate your BCDODB account via the activation email sent from object.biocompute@gmail.com')
    localStorage.setItem('tokenAPI', JSON.stringify(res_.data.token));
    // Show the success message for a couple of seconds.
  }).catch((error) => {
    alert(`Something went wrong.${error}`);
    console.log('error', error);
    // return error;
  }));
}

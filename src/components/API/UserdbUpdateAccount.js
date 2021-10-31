// /src/components/API/UserdbUpdateAccount.js 

/* submits form for new account on UserDb */

import Alert from '@material-ui/lab/Alert';
export default function UserdbUpdateAccount(values) {
  // let responseData = '';
  console.log("recieved for userdb", values);
  console.log("Values isPublic : Type", values.isPublic, typeof(values.isPublic));

  fetch(values.userurl, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        groups: values.groups,
        password: values.password,
        username: values.username,
        affiliation: values.affiliation,
        orcid: values.orcid,
        public: values.public,
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
      Alert("Something went wrong. Most likley that username already exists.", error);
      console.log('error', error)
      return error;
  })
);
}

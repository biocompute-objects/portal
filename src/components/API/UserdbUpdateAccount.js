// /src/components/API/UserdbUpdateAccount.js

/* submits form for account update on UserDb */

export default function UserdbUpdateAccount(values) {
  // let responseData = '';
  console.log('recieved for userdb', values);
  console.log('Values isPublic : Type', values.isPublic, typeof (values.isPublic));

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
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            alert(`Account Update success!`);
            console.log('data', data)
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Account Update FAILED! ${error}`);
    });
}

// /src/components/API/UserdbChangePassword.js

/* Returns a JSON Web Token that can be used for authenticated requests. */

export default function UserdbChangePassword(values) {
  fetch(`${values.userdb}change_password/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      old_password: values.old_password,
      new_password: values.new_password,
    }),
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            alert('Your password has been updated.');
            console.log('data', );
          });
      }
    })
    .catch((error) => {
      // TODO: This needs to be fleshed out to get all errors and deal with them
      alert(`The provided OLD PASSWORD was not correct. ${error}`);
      console.log('error', error);
      // return error;
    });
}

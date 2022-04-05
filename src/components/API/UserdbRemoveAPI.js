// /src/components/API/UserdbRemoveAPI.js

/* submits form for removing an API on UserDb */

export default function UserdbUpdateAccount(values) {
  // let responseData = '';
  console.log('recieved for userdb', values);
  console.log('Values isPublic : Type', values.isPublic, typeof (values.isPublic));

  fetch(fc.sending.userdb_removeapi, {
    method: 'DELETE',
    body: JSON.stringify({ selected_rows: selectedRows }),
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            localStorage.setItem('user', JSON.stringify(data));
            setServerChange(true);
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Account Update FAILED! ${error}`);
    });
}

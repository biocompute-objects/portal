// /src/components/API/ApiNewAccount.js 

/* submits form for new account on UserDb */

import Alert from '@material-ui/lab/Alert';
export default function ApiNewAccount( values ) {
  let responseToken = JSON.parse(localStorage.getItem('tokenAPI'))

  console.log("recieved for API", responseToken)
    fetch(values.apiurl, {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        hostname: values.userurl,
        token: responseToken
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // alert(data.message + ' Token: ' + data.token);
      localStorage.removeItem('tokenAPI')
    })
    .catch((error) => {
        alert("Something went wrong. Most likley that username already exists.", error);
        console.log('error', error)
        return error;
    });
    
}
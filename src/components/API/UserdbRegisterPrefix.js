// /src/components/Api/RegisterPrefix.js

/*  */

import PropTypes from 'prop-types';

export default function RegisterPrefix(username, prefix, ApiInfo) {
  console.log('stuff', username, prefix, `${ApiInfo}`);
  fetch(`${ApiInfo}register_prefix/${username}/${prefix}`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response
          .then((data) => {
            console.log('data', data);
          });
      }
      return response
        .then((data) => {
          console.log('data', data);
        //   alert(`${data}`);
        });
    }).catch((error) => {
      console.log(`error: ${error}`);
      alert(`Register prefix failed ${error}`);
    });
}

RegisterPrefix.PropTypes = {
  username: PropTypes.string,
  prefix: PropTypes.string,
  ApiInfo: PropTypes.object
};

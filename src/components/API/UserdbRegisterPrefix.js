// /src/components/Api/RegisterPrefix.js

/*  */

import PropTypes from 'prop-types';

export default function RegisterPrefix(username, prefix, ApiInfo, isPublic) {
  fetch(`${ApiInfo}register_prefix/${username}/${prefix}/${isPublic}`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        alert(`Prefix ${prefix} was successfully registered for ${username}.`)
        return response
      }
      if (response.status === 409) {
        alert(`Register prefix failed. That prefix is already registered.`);
        return response.status
      }
    }).catch((error) => {
      console.log(`error: ${error}`);
      alert(`Register prefix failed ${error}`);
    });
}

RegisterPrefix.PropTypes = {
  username: PropTypes.string,
  prefix: PropTypes.string,
  ApiInfo: PropTypes.object,
  isPublic: PropTypes.bool
};

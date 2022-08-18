// /src/components/Api/SearchPrefix.js

/* Retrievs a draft object using the current user's token and an object's
draft id */

import PropTypes from 'prop-types';

export default function SearchPrefix(action, search, ApiInfo, setRows, isLoggedIn) {
  console.log('stuff', action, search, typeof setRows, isLoggedIn, `${ApiInfo}prefixes/`);
  function getToken() {
    if (isLoggedIn) {
      return localStorage.getItem('token');
    }
    return 'dummytokentext';
  }
  const token = getToken();

  fetch(`${ApiInfo}prefixes/`, {
    method: 'POST',
    body: JSON.stringify({
      post_userdb_prefix_search: [
        {
          search_type: action,
          search_term: search,
        }
      ]
    }),
    headers: {
      Authorization: `JWT ${token}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((data) => {
            console.log('data', data);
            setRows(data);
          });
      }
      return response.json()
        .then((data) => {
          console.log('data', data);
          alert(`${data}`);
        });
    }).catch((error) => {
      console.log(`error: ${error}`);
      alert(`Retrieve object FAILED! ${error}`);
    });
}

SearchPrefix.PropTypes = {
  action: PropTypes.string.isRequired,
  search: PropTypes.string,
  ApiInfo: PropTypes.object,
  setRows: PropTypes.func,
  isLoggedIn: PropTypes.bool
};

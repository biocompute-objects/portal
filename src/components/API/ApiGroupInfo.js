// /src/components/API/ApiGroupInfo.js

/* submits form for new account on UserDb */
import PropTypes from 'prop-types';

export default function ApiGroupInfo(group, token, url, setGroupInfo) {
  console.log(group, token, url);
  fetch(`${url}/api/groups/group_info/`, {
    method: 'POST',
    body: JSON.stringify(
      {
        POST_api_groups_info: {
          names: [group]
        }
      }
    ),
    headers: {
      Authorization: `Token ${token}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((data) => {
            setGroupInfo(data[0]);
          });
      }
      throw new Error(response.status);
    })
    .catch((error) => {
      alert(`${url} says: Something went wrong. ${error}`);
      console.log('error', error);
    });
}

ApiGroupInfo.PropTypes = {
  group: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setGroupInfo: PropTypes.func
};

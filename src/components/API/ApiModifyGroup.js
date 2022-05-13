// /src/components/API/ApiNewAccount.js

/* submits form for new account on UserDb */
import PropTypes from 'prop-types';

export default function ApiNewGroup(
  groupInfo, groupName, addUsers, removeUsers, description, url, submitToken
) {
  const oldName = groupInfo.name;
  fetch(`${url}/api/groups/modify/`, {
    method: 'POST',
    body: JSON.stringify(
      {
        POST_api_groups_modify: [
          {
            name: oldName,
            actions: {
            //   rename: groupName,
              redescribe: description,
              //   owner_user: 'string',
              remove_users: removeUsers,
              add_users: addUsers
            }
          }
        ]
      }
    ),
    headers: {
      Authorization: `Token ${submitToken}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((data) => {
            alert(`${url} says: ${data[0].message}`);
          });
      }
      if (response.status === 409) {
        alert(`${url} says: An account with that email is awaiting activation.`);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => {
      alert(`${url} says: Something went wrong. ${error}`);
      console.log('error', error);
    });
}

ApiNewGroup.PropTypes = {
  groupInfo: PropTypes.object,
  groupName: PropTypes.string,
  addUsers: PropTypes.array,
  removeUsers: PropTypes.array,
  description: PropTypes.string,
  url: PropTypes.string,
  submitToken: PropTypes.string,
};

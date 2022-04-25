// /src/components/API/ApiNewAccount.js

/* submits form for new account on UserDb */
import PropTypes from 'prop-types';

export default function ApiNewGroup(
  groupName, groupUsers, deleteMembers, description, expiration, maxMembers, url, submitToken
) {
  fetch(`${url}/api/groups/create/`, {
    method: 'POST',
    body: JSON.stringify(
      {
        POST_api_groups_create: [
          {
            name: groupName,
            usernames: groupUsers,
            delete_members_on_group_deletion: deleteMembers,
            description,
            expiration,
            max_n_members: maxMembers
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
  groupName: PropTypes.string,
  groupUsers: PropTypes.array,
  deleteMembers: PropTypes.bool,
  description: PropTypes.string,
  expiration: PropTypes.string,
  maxMembers: PropTypes.number,
  url: PropTypes.string,
  submitToken: PropTypes.string,
};

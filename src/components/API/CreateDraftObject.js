// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function CreateDraftObject(url) {
  const obectContents = JSON.parse(localStorage.getItem('bco'));
  let userToken = '';

  JSON.parse(localStorage.getItem('user')).apiinfo.forEach((item) => {
    if (url === item.public_hostname) {
      userToken = item.token;
    }
  });
  fetch(`${url}/api/objects/drafts/create/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_draft_create: [
        {
          contents: obectContents,
          prefix: 'BCO',
          schema: 'IEEE',
          owner_group: 'bco_drafter'
        }
      ]
    }),
    headers: {
      Authorization: `Token ${userToken}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            console.log('data', data[0].object_id);
            const objectId = data[0].object_id;
            alert(`POST_api_objects_drafts_modify: Success! Save the following object ID to access later  ${data[0].object_id}`);
            const processed = objectId.replace('://', '/');
            window.location.href = `${window.location}/${processed}`;
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`POST_api_objects_drafts_modify: FAILED! ${error}`);
    });
}

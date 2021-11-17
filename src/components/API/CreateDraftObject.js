// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function CreateDraftObject(url) {
  const obectContents = JSON.parse(localStorage.getItem('bco'));
  let userToken = '';
  let userGroup = '';

  JSON.parse(localStorage.getItem('user')).apiinfo.forEach((item) => {
    if (url === item.public_hostname) {
      userToken = item.token;
      userGroup = item.username;
    }
  });
  console.log('save bco 13', url, userGroup, userToken, localStorage.getItem('bco'));
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
      if (response.status === 200) {
        console.log('POST_api_objects_drafts_modify: Success!', response);
        alert('POST_api_objects_drafts_modify: Success!', response);
      } else {
        console.log('POST_api_objects_drafts_modify: FAILED!');
        alert('POST_api_objects_drafts_modify: FAILED!');
      }
    });
}

// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function ModifyDraftObject(objectInformation) {
  const objectContents = JSON.parse(localStorage.getItem('bco'));

  console.log('bco', objectInformation);
  fetch(`${objectInformation.hostname}/api/objects/drafts/modify/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_drafts_modify: [
        {
          contents: objectContents,
          object_id: objectContents.object_id
        }
      ]
    }),
    headers: {
      Authorization: `Token ${objectInformation.token}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('POST_api_objects_drafts_modify: Success!');
        alert(`${objectInformation.owner} has saved ${objectInformation.object_id} successfully!`);
      } else {
        console.log('POST_api_objects_drafts_modify: FAILED!');
        alert('POST_api_objects_drafts_modify: FAILED!');
      }
    });
}

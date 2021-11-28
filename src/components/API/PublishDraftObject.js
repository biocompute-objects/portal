// /src/components/Api/PublishDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function PublishDraftObject(objectInformation) {
  const obectContents = JSON.parse(localStorage.getItem('bco'));

  console.log('bco', objectInformation);
  fetch(`${objectInformation.hostname}/api/objects/drafts/publish/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_drafts_publish: [
        {
          prefix: 'BCO',
          draft_id: obectContents.object_id,
          delete_draft: true
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
        console.log('POST_api_objects_drafts_publish: Success!', response);
        alert('Object published successfully! Please visit BioCompute Objects page for your draft');
      } else {
        console.log('POST_api_objects_drafts_publish: FAILED!');
        alert('POST_api_objects_drafts_publish: FAILED!');
      }
    });
}

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
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        console.log('POST_api_objects_drafts_publish: Success!', response);
        return response.json()
          .then((data) => {
            const publishedId = data[0].published_id;
            const publishedObject = publishedId.replace('://', '/');
            const viewer = window.location.origin + '/objects/view/';
            window.location.href = `${viewer}${publishedObject}`;
            alert('Object published successfully! Redirecting to the Object page for you to view');
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`POST_api_objects_drafts_publish: FAILED! ${error}`);
    });
}

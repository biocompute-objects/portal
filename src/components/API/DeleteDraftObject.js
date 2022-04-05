// /src/components/Api/DeleteDraftObject.js

/* Deletes a draft object using the current user's token and an object's
draft id */

export default function DeleteDraftObject(objectInformation, contents) {
  const objectContents = contents;
  const deleteDraft = window.confirm(`Are you sure you wnat to delete ${objectInformation.object_id}`);
  if (deleteDraft === true) {
    fetch(`${objectInformation.hostname}/api/objects/drafts/modify/`, {
      method: 'POST',
      body: JSON.stringify({
        POST_api_objects_drafts_modify: [
          {
            contents: objectContents,
            object_id: objectInformation.object_id,
            state: 'DELETE'
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
          return response.json()
            .then((data) => {
              console.log('POST_api_objects_drafts_modify: Success!', objectContents);
              localStorage.removeItem('bco');
              alert(`${objectInformation.owner} has DELETED ${objectInformation.object_id} successfully!`);
              window.location.href = '/objects';
            });
        }
      })
      .catch((error) => {
        console.log(`error: ${error}`);
        alert(`Save Draft FAILED! ${error}`);
      });
  }
}

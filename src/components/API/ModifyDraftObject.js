// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function ModifyDraftObject(objectInformation, contents) {
  const objectContents = contents;

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
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            console.log('POST_api_objects_drafts_modify: Success!', objectContents);
            alert(`${objectInformation.owner} has saved ${objectInformation.object_id} successfully!`);
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Save Draft FAILED! ${error}`);
    });
}

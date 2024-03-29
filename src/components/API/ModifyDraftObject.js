// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function ModifyDraftObject(objectInformation, contents) {
  const objectContents = contents;

  fetch(`${objectInformation.hostname}/api/objects/drafts/modify/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_drafts_modify: [
        {
          contents: objectContents,
          object_id: objectInformation.object_id
        }
      ]
    }),
    headers: {
      Authorization: `Token ${objectInformation.token}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(async(response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      if (response.status === 207) {
        const data = await response.json();
        throw new Error(data[0].message)
      }
      if (response.status === 200) {
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

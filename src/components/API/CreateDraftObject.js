// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function CreateDraftObject(saveDraftTo, contents, prefix) {
  const objectContents = contents;
  console.log('objectContents', contents);

  fetch(`${saveDraftTo[0]}/api/objects/drafts/create/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_draft_create: [
        {
          contents: objectContents,
          prefix,
          schema: 'IEEE',
          owner_group: 'bco_drafter'
        }
      ]
    }),
    headers: {
      Authorization: `Token ${saveDraftTo[1]}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      if (response.status === 207) {
        const data = await response.json();
        throw new Error(data[0].message);
      }
      if (response.status === 200) {
        const data = await response.json();
        console.log('data', data);
        const objectId = data[0].object_id;
        alert(`Create Draft Success! Save the following object ID to access later  ${objectId}`);
        const processed = objectId.replace('://', '/');
        window.location.href = `${window.location}/${processed}`;
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Create Draft FAILED! ${error}`);
    });
}

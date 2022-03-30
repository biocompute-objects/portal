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
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            console.log('data', data);
            const objectId = data.object_id;
            alert(`Create Draft Success! Save the following object ID to access later  ${data.object_id}`);
            const processed = objectId.replace('://', '/');
            window.location.href = `${window.location}/${processed}`;
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Create Draft FAILED! ${error}`);
    });
}

// /src/components/Api/PublishDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

export default function PublishDraftObject(objectInformation, contents) {
  const obectContents = contents;
  const { version } = obectContents.provenance_domain;
  const publishedId = obectContents.object_id.replace('DRAFT', version);
  const prefix = obectContents.object_id.split('_')[0].split('/').pop();

  fetch(`${objectInformation.hostname}/api/objects/drafts/modify/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_drafts_modify: [
        {
          contents,
          object_id: objectInformation.object_id
        }
      ]
    }),
    headers: {
      Authorization: `Token ${objectInformation.token}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((saveResponse) => {
      if (!saveResponse.ok) {
        throw new Error(saveResponse.status);
      }
    })
    .then(fetch(`${objectInformation.hostname}/api/objects/drafts/publish/`, {
      method: 'POST',
      body: JSON.stringify({
        POST_api_objects_drafts_publish: [
          {
            prefix,
            draft_id: obectContents.object_id,
            object_id: publishedId,
            delete_draft: false
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
        } else if (response.status === 200) {
          console.log('POST_api_objects_drafts_publish: Success!', response);
          return response.json()
            .then((data) => {
              const returnedId = data[0].published_id;
              const publishedObject = returnedId.replace('://', '/');
              const viewer = `${window.location.origin}/objects/view/`;
              window.location.href = `${viewer}${publishedObject}`;
              alert('Object published successfully! Redirecting to the Object page for you to view');
            });
        } else if (response.status === 207) {
          console.log('POST_api_objects_drafts_publish: Failed!');
          return response.json()
            .then((data) => {
              const { message } = data[0];
              alert(`Object publishing Failed! ${message}`);
            });
        }
      }))
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`POST_api_objects_drafts_publish: FAILED! ${error}`);
    });
}

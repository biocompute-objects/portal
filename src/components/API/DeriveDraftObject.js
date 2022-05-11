// /src/components/Api/ModifyDraftObject.js

/* Modifies a draft object using the current user's token and an object's
draft id */

import PropTypes from 'prop-types';

export default function DeriveDraftObject(saveDraftTo, prefix) {
  const date = new Date()
  const objectContents = JSON.parse(localStorage.getItem('bco'));
  const ownerGroup = prefix.concat('_drafter');
  objectContents.provenance_domain.derived_from = objectContents.object_id;
  objectContents.provenance_domain.created = date.toISOString();
  objectContents.provenance_domain.modified = date.toISOString();
  delete objectContents.provenance_domain.review;
  console.log(ownerGroup, prefix, saveDraftTo);
  fetch(`${saveDraftTo[0]}/api/objects/drafts/create/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_draft_create: [
        {
          contents: objectContents,
          schema: 'IEEE',
          prefix,
          owner_group: ownerGroup
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
            console.log('data', data[0].object_id);
            const objectId = data[0].object_id;
            alert(`Derrive Draft Success! Save the following object ID to access later  ${data[0].object_id}`);
            const processed = objectId.replace('://', '/');
            console.log('derrive 42', `${window.location.origin}/builder/${processed}`);
            window.location.href = `${window.location.origin}/builder/${processed}`;
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Derrive Draft FAILED! ${error}`);
    });
}

DeriveDraftObject.propTypes = {
  saveDraftTo: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired
}
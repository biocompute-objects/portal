// /src/components/Api/ApiValidateSchema.js

/* Validated a BCO using the API */

import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

export default function ApiValidateSchema(objectInformation, contents, setPublish, viewResult) {
  fetch(`${objectInformation.hostname}/api/objects/validate/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_validate_bco: [
        contents
      ]

    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            console.log('POST_validate_bco: Success!', data);
            if (viewResult === 'download') {
              const blob = new Blob([JSON.stringify(data)], { type: 'text/json' });
              saveAs(blob, `${objectInformation.object_id}.json`);
            }
            if (viewResult === 'display') {
              const link = document.createElement('a');
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/json' });
              //   alert(`Result display: ${blob}`);
              link.href = URL.createObjectURL(blob);
              window.open(link);
            }
          });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      alert(`Save Draft FAILED! ${error}`);
    });
}

ApiValidateSchema.PropTypes = {
  objectInformation: PropTypes.object.isRequired,
  contents: PropTypes.object.isRequired,
  setPublish: PropTypes.func,
  viewResult: PropTypes.string,
};

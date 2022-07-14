// src/components/ValidateSchema.js

/* validates a JSON against a SCHEMA */

import Ajv from 'ajv';
import object from 'src/utils/ieee2791/2791object';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

const ajv = Ajv({ allErrors: true });

export default function ValidateSchema(contents, setPublish, viewResult) {
  const BcoSchema = object;
  console.log('objectContents', contents);
  const objectId = (contents.object_id ? contents.object_id : 'new_draft');

  const valid = ajv.validate(BcoSchema, contents);
  if (valid) {
    setPublish(true);
    console.log('BCO is valid');
    // eslint-disable-next-line no-alert
    alert('BCO is valid');
  } else {
    console.log('BCO is INVALID!', ajv.errors, contents);
    if (viewResult === 'download') {
      const blob = new Blob([JSON.stringify(ajv.errors)], { type: 'text/json' });
      saveAs(blob, `${objectId}.json`);
      console.log(`result download: ${viewResult}`);
    }
    if (viewResult === 'display') {
      console.log(`result display: ${viewResult}`);
      const link = document.createElement('a');
      const blob = new Blob([JSON.stringify(ajv.errors, null, 2)], { type: 'text/json' });
      link.href = URL.createObjectURL(blob);
      window.open(link);
    }
    // eslint-disable-next-line no-alert
    // alert(`
    //   You have an error in your ${ajv.errors[0].keyword}.
    //   "${ajv.errors[0].dataPath}"
    //   ${ajv.errors[0].message}

    //   1) If this field is blank, you may need to delete it. Try using the Tree view.

    //   2) If this field appears correct, check for extra spaces.

    //   For more information check the schema here:
    //     ${ajv.errors[0].schemaPath}`);
  }
}

ValidateSchema.PropTypes = {
  contents: PropTypes.object.isRequired,
  setPublish: PropTypes.func,
  viewResult: PropTypes.string
};

// src/components/ValidateSchema.js

/* validates a JSON against a SCHEMA */

import Ajv from 'ajv';
import object from 'src/utils/ieee2791/2791object';

const ajv = Ajv({ allErrors: true });

export default function ValidateSchema(contents, setPublish) {
  const BcoSchema = object;
  console.log('objectContents', contents);

  const valid = ajv.validate(BcoSchema, contents);
  if (valid) {
    setPublish(true);
    console.log('BCO is valid');
    // eslint-disable-next-line no-alert
    alert('BCO is valid');
  } else {
    console.log('BCO is INVALID!', ajv.errors, contents);
    // eslint-disable-next-line no-alert
    alert(`
      You have an error in your ${ajv.errors[0].keyword}.
      "${ajv.errors[0].dataPath}"
      ${ajv.errors[0].message}

      1) If this field is blank,  you may need to delete it. Try using the Tree view.

      2) If this field appears correct check for extra spaces. 

      For more information check the schema here:
        ${ajv.errors[0].schemaPath}`);
  }
}

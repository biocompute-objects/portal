// src/components/ValidateSchema.js

/* validates a JSON against a SCHEMA */

import Ajv from 'ajv';
import object from 'src/utils/ieee2791/2791object';

const ajv = Ajv();

export default function ValidateSchema(contents, setPublish) {
  const BcoSchema = object;
  console.log('objectContents', contents);
  // 'https://opensource.ieee.org/2791-object/ieee-2791-schema/raw/master/2791object.json';
  // 'https://w3id.org/ieee/ieee-2791-schema/2791object.json';
  // fetch(BcoSchema, { mode: 'no-cors' });

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
      For more information check the schema here:
        ${ajv.errors[0].schemaPath}`);
  }
}

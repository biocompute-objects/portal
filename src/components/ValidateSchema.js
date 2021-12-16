// src/components/ValidateSchema.js

/* validates a JSON against a SCHEMA */

import Ajv from 'ajv';
import object from 'src/utils/ieee2791/2791object';

const ajv = Ajv();

export default function ValidateSchema(contents, setPublish, publish) {
  const BcoSchema = object;

  console.log('objectContents', setPublish, contents);
  // 'https://opensource.ieee.org/2791-object/ieee-2791-schema/raw/master/2791object.json';
  // 'https://w3id.org/ieee/ieee-2791-schema/2791object.json';
  // fetch(BcoSchema, { mode: 'no-cors' });
  const valid = ajv.validate(BcoSchema, contents);
  if (valid) {
    setPublish(true);
    console.log('BCO is valid', publish);
    alert('BCO is valid');
  } else {
    console.log('BCO is INVALID!', ajv.errors);
    alert(JSON.stringify(ajv.errors));
  }
}

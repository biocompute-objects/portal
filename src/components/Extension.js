/* eslint-disable no-nested-ternary */
// src/components/Extension.js

import React, { useState, useEffect } from 'react';
import {
  Card, CardContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Form from '@rjsf/material-ui';

export default function Extension({
  extension, schemaUrl, index, allExtensions
}) {
  const [schema, setSchema] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    fetch(schemaUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setSchema(jsonData);
        setFormData(extension);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
        alert(`Fetch schema FAILED: ${error}`);
        setSchema('');
        setFormData('');
      });
  }, [allExtensions]);

  const onSubmit = ({ newFormData }) => {
    const holder = allExtensions.exd;
    holder[index] = newFormData;
    allExtensions.setExd(holder);
  };

  const uiSchema = {
    'ui:order': ['extension_schema', '*'],
    extension_schema: {
      'ui:readonly': true
    }
  };

  return (
    <Card>
      { (!schema)
        ? (<div>loading</div>)
        : (
          <CardContent>
            <Form
              schema={schema}
              formData={formData}
              uiSchema={uiSchema}
              onSubmit={onSubmit}
            />
          </CardContent>
        )}
      <br />
    </Card>
  );
}

Extension.propTypes = {
  extension: PropTypes.object,
  schemaUrl: PropTypes.string,
  index: PropTypes.string,
  allExtensions: PropTypes.any
};

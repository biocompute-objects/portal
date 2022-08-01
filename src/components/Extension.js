/* eslint-disable no-nested-ternary */
// src/components/Extension.js

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Form from "@rjsf/material-ui";

export default function Extension({ extension, schemaUrl }) {
  const [schema, setSchema] = useState();
  const [formData, setFormData] = useState()

  useEffect(() => {
    console.log('extension log', extension)
    fetch(schemaUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setSchema(jsonData)
      })
  }, []);

  return (
    <Card>
      { (!schema)
        ? (<div>'loading'</div>)
        : (
            <Form
              schema={schema}
              formData={extension}
              onChange={e => setFormData(e.formData)}
            />
          )
      }
      <br/>
    </Card>
  );
}

Extension.propTypes = {
  extension: PropTypes.object,
  schemaUrl: PropTypes.string
};

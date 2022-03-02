// src/components/Etag.js

import React from 'react';
import PropTypes from 'prop-types';

export default function Etag(contents) {
  console.log('contents', contents);
}

Etag.propTypes = {
  contents: PropTypes.object.isRequired,
};

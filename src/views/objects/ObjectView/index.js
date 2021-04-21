// src/views/objects/ObjectView/index.js

import React from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

// Tools
import Tools from './Tools'

// Views
import Views from './Views'

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

export default function ObjectView() {

  // For development only.
  const removePortNumber = (uri) => {

    // Add port number 3000.

    // Look for the index of the localhost url.
    const localhostUrlIndex = uri.indexOf('127.0.0.1');

    // Construct the new URI.
    const newUri = uri.substring(0,localhostUrlIndex+9) + '/' + uri.substring(localhostUrlIndex+15, uri.length);
    console.log('newUri', newUri);

    return(newUri);

  }
  
  // The table to use is based on the URL.

  // Set the object requested.
  const parsePath = useLocation().pathname;

  // Check against the REGEX to determine the table.

  // Simply check for two underscores for a draft table,
  // otherwise we have a publish table.

  var tableName = '';

  if(parsePath.indexOf('_') != parsePath.lastIndexOf('_')) {

    // Draft table.
    tableName = parsePath.split('/')[1].split('_');
    tableName = [tableName[0], tableName[1]].join('_').toLowerCase();

  } else {

    // Publish table.
    tableName = parsePath.split('/')[1].split('_')[0].toLowerCase() + '_publish';

  }
  
  return (
    <div>
      <Tools />
      <Views table={tableName} objectId={ window.location.href.indexOf(':3000') !== -1 ? removePortNumber(window.location.href) : window.location.href } />
    </div>
  );
}
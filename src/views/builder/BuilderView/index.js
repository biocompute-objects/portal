import React, { useState } from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

// Tools
import Tools from './Tools'

// Views
import Views from './Views'

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

export default function BuilderView() {

  // Set the state.
  const [loading, setLoading] = useState(true);
  const [objectFound, setObjectFound] = useState();
  const [objectInfo, setObjectInfo] = useState();

  // Behavior for urls (the table and data to use are based on the URL)
  // https://.../builder -> ask for a new draft ID
  // https://.../builder/PREFIX_DRAFT_... -> load the draft information.

  // Set the URL requested.
  const parsePath = useLocation().pathname;

  // Are we working with a new draft object or an existing one?
  if(parsePath.indexOf('DRAFT') === -1) {

    // New object.  We have to wait for the user to
    // ask for a new object ID using a specified prefix.

  } else {
    
    // Check against the REGEX to determine the table
    // and object ID.

    // Simply check for two underscores for a draft table,
    // otherwise we have a publish table.

    var tableName = '';

    if(parsePath.indexOf('_') != parsePath.lastIndexOf('_')) {

      // Draft table.
      tableName = parsePath.split('/')[2].split('_');
      tableName = [tableName[0], tableName[1]].join('_').toLowerCase();

    } else {

      // Publish table.
      tableName = parsePath.split('/')[2].split('_')[0].toLowerCase() + '_publish';

    }

    // Remove the 'builder' part of the URI.

    // First, see where the 'builder' part is.
    const builderIndex = window.location.href.indexOf('/builder');

    // Now drop this part of the string.
    var objectId = window.location.href.substr(0, builderIndex) + window.location.href.substr(builderIndex+8, window.location.href.length);

  }
  
  return (
    <div>
      <Tools />
      <Views table={tableName} objectId={objectId} />
    </div>
  );
}
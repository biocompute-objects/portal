import React from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

// Views
import Views from './Views'

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

export default function ValidatorView() {
  
  // Declare the view type.
  const [viewType, setViewType] = React.useState('color');
  
  const handleViewChange = (view) => {
    this.setViewType({view});
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
      <Views table={tableName} objectId={window.location.href} />
    </div>
  );
}

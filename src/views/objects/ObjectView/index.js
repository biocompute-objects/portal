// src/views/objects/ObjectView/index.js

import React from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

// Tools
// import Tools from './Tools'

// Views
import Views from './Views'

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

export default function ObjectView() {

  // Split to get a real URI, then ask for the object.  
  return (
    <div>
     {/* <Tools />*/}
      <Views objectId = { window.location.href.split('objects/view/')[1].replace('/', '://') } />
    </div>
  );
}
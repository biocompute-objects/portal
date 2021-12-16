// src/views/objects/ObjectView/index.js

import React, { useContext } from 'react';
import { FetchContext } from 'src/App';
import Tools from './Tools';
import Views from './Views';
// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html
export default function ObjectView() {
  const fc = useContext(FetchContext);
  // Split to get a real URI, then ask for the object.
  return (
    (fc.isLoggedIn === false)
      ? (
        <div>
          <Views objectId={window.location.href.split('objects/view/')[1].replace('/', '://')} />
        </div>
      )
      : (
        <div>
          <Tools />
          <Views objectId={window.location.href.split('objects/view/')[1].replace('/', '://')} />
        </div>
      )
  );
}

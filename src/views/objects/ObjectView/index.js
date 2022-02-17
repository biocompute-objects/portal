// src/views/objects/ObjectView/index.js

import React, { useContext } from 'react';
import { FetchContext } from 'src/App';
import Tools from './Tools';
import Views from './Views';
import Page from 'src/components/Page';
// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html
export default function ObjectView() {
  const fc = useContext(FetchContext);
  // Split to get a real URI, then ask for the object.
  const idAsList = window.location.href.split('objects/view/')[1].split('/');
  const pageId = `${idAsList[idAsList.length - 2]}/${idAsList[idAsList.length - 1]}`;

  return (
    (fc.isLoggedIn === false)
      ? (
        <Page title={pageId}>
          <Views objectId={window.location.href.split('objects/view/')[1].replace('/', '://')} />
        </Page>
      )
      : (
        <Page title={pageId}>
          <Tools />
          <Views objectId={window.location.href.split('objects/view/')[1].replace('/', '://')} />
        </Page>
      )
  );
}

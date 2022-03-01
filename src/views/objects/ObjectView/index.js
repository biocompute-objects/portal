// src/views/objects/ObjectView/index.js

import React, { useContext } from 'react';
import { FetchContext } from 'src/App';
import Page from 'src/components/Page';
import Tools from './Tools';
import Views from './Views';

export default function ObjectView() {
  const fc = useContext(FetchContext);
  // Split to get Object Id to display on tab.
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

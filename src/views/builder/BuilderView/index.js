// src/views/builder/BuilderView/index.js

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import PermissionTools from 'src/components/PermissionTools';
import Views from './Views';

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

// Context for deep nestings.
export const DeepContext = createContext();

export default function BuilderView() {
  // State

  // The actual object contents.
  const [objectContents, setObjectContents] = useState({});

  // A variable to indicate that we are still loading the tools.
  const [toolsLoading, setToolsLoading] = useState(true);

  // A variable to indicate that we are still loading the builder.
  const [loading, setLoading] = useState(true);

  // Was the provided URI valid?
  const [objectFound, setObjectFound] = useState(false);

  // Object compliance (incremented every time object compliance is checked
  // so as to enforce a re-render).

  // Could use context handler, but for now just pass directly.
  const [complianceCheck, setComplianceCheck] = useState(0);

  // For saving drafts.
  const [saveDraft, setSaveDraft] = useState(0);

  // For publishing.
  const [publish, setPublish] = useState(false);

  // Was publishing successful?
  const [publishMessage, setPublishMessage] = useState({});

  // For downloading drafts.
  const [downloadDraft, setDownloadDraft] = useState(0);

  // For deleting drafts.
  const [deleteDraft, setDeleteDraft] = useState(0);

  // Where are we saving either a draft or a published object?
  const [draftSavingLocation, setDraftSavingLocation] = useState('');
  const [publishSavingLocation, setPublishSavingLocation] = useState('');

  // Delete the draft after we publish?
  const [deleteDraftPostPublish, setDeleteDraftPostPublish] = useState(true);

  // Was the initial draft successfuly created OR are we working
  // with a draft that was save previously?
  const [serverLock, setServerLock] = useState(false);
  const [newDraft, setNewDraft] = useState(null);
  // For some reason had to have this in a state variable.
  const [objectId, setObjectId] = useState('');
  const [parsePath, setParsePath] = useState(useLocation().pathname);

  // All of the relevant things associated with an object ID.
  const [objectInformation, setObjectInformation] = useState({});

  // Who owns it?
  const [objectOwner, setObjectOwner] = useState('');

  // The PUBLISHED object ID.
  const [publishedObjectId, setPublishedObjectId] = useState('');

  // A provided default for the server to save the draft to.
  const [receivedDefault, setReceivedDefault] = useState(null);

  // Initial rendering.
  useEffect(() => {
    // See if we're dealing with a new or existing draft.
    // TODO: fix '/' re-directs in routes.js.
    const splitUp = parsePath.split('builder');

    if (splitUp[splitUp.length - 1] === '') {
      setNewDraft(true);
      // Set the object contents to template values.
      setObjectFound(true);
    } else {
      // EXISTING draft
      setNewDraft(false);
      // Take everything after the builder section.
      const splitAgain = splitUp[1].split('/');

      // Get the hostname and object ID.
      const hostname = `${splitAgain[1]}://${splitAgain[2]}`;
      const oI = `${hostname}/${splitAgain.slice(3, splitAgain.length)}`;

      // Now look for a token associated with the hostname.

      // BAD fix, should have apiinfo stored as object...
      let foundToken = '';
      let foundGroups = [];
      let objectStuff = {};

      JSON.parse(localStorage.getItem('user')).apiinfo.map((item) => {
        if (item.public_hostname === hostname) {
          foundToken = item.token;
          foundGroups = item.other_info.permissions.groups;
          objectStuff = ({
            object_id: oI,
            token: item.token,
            groups: item.other_info.permissions.groups,
            owner: item.username,
            hostname: item.public_hostname
          });
          setObjectInformation(objectStuff);
        }
      });

      // Ask the server for the contents.
      fetch(oI, {
        method: 'GET',
        headers: {
          Authorization: `Token ${foundToken}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res) => res.json().then((data) => ({
        data,
        status: res.status
      })).then((response) => {
        // Did the request go ok or not?
        if (response.status === 200) {
          console.log('Server return contents: ', foundToken);
          // Parse the results.
          // const parsed = JSON.parse(res.data)[0];

          // Set the object information.
          setObjectContents(response.data);
          localStorage.setItem('bco', JSON.stringify(response.data));
          // Set the draft saving location.
          setReceivedDefault(response.data.object_id);
          // Lock the savable server based on the information
          // associated with the draft.
          setServerLock(true);

          setDraftSavingLocation({
            hostname,
            group: foundGroups,
          });

          // setLoading and setObjectFound MUST be within
          // the response section of this fetch so as to
          // not be fired before the response is done.

          // TODO: improve error checking here to check for
          // an invalid object ID.

          // Who created it?
          setObjectOwner(foundToken);
          // Get the permissions.
          setObjectId(oI);

          // No longer loading.
          setToolsLoading(false);
          setLoading(false);

          // The object was found.
          setObjectFound(true);
        }
      }));
    }
  }, []);

  // ----- Listeners ----- //
  return (
    <DeepContext.Provider value={{ objectOwner }}>
      <div>
        <PermissionTools
          newDraft={newDraft}
          objectInformation={objectInformation}
          setDownloadDraft={setDownloadDraft}
          saveDraft={saveDraft}
          setSaveDraft={setSaveDraft}
          publish={publish}
          setPublish={setPublish}
          complianceCheck={complianceCheck}
          contents={objectContents}
        />
        <Views
          objectContents={objectContents}
          setObjectContents={setObjectContents}
          complianceCheck={complianceCheck}
          objectId={objectId}
          loading={loading}
          objectFound={objectFound}
        />
      </div>
    </DeepContext.Provider>
  );
}

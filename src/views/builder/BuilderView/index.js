/* eslint-disable no-unused-vars */
// src/views/builder/BuilderView/index.js

import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PermissionTools from 'src/components/PermissionTools';
import Page from 'src/components/Page';
import Views from './Views';

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

  // Could use context handler, but for now just pass directly.
  const [complianceCheck, setComplianceCheck] = useState(0);

  // For publishing.
  const [publish, setPublish] = useState(false);

  // Where are we saving either a draft or a published object?
  const [draftSavingLocation, setDraftSavingLocation] = useState('');

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

  // Etag needs to be generated?
  const [eTag, setETag] = useState(objectContents.etag ? objectContents.etag : '');

  // A provided default for the server to save the draft to.
  const [receivedDefault, setReceivedDefault] = useState(null);

  // Etag needs to be generated?
  const [meEtagSet, setMeEtagSet] = useState(false);

  // Initial rendering.
  useEffect(() => {
    const splitUp = parsePath.split('/');
    console.log('split', splitUp);
    if (splitUp.length === 2) {
      setNewDraft(true);
      // Set the object contents to template values.
      setObjectFound(true);
    } else {
      // Expected for EXISTING draft
      // [0   1     2      3                4                                       5
      // [,builder,http,127.0.0.1:8000,BCO_DRAFT_82b24092def74e70a5a2344fda39eeb4,DRAFT]

      if (splitUp.length < 4) {
        console.log(`Error in BuilderView/Index.js ~ 99 - URL doesn't have expected elements: ${parsePath}  ... Expected: (e.g) /builder/http/127.0.0.1:8000/BCO_DRAFT_82b24092def74e70a5a2344fda39eeb4/DRAFT`);
        return;
      }

      setNewDraft(false);
      const protocol = splitUp[2];
      // Verify protocol is OK
      if (protocol !== 'http' && protocol !== 'https') {
        console.log(`Protocol is determined as ${protocol} but must be one of http or https.`);
        return;
      }
      let hostname = splitUp[3];
      // Prepend the protocol
      hostname = `${protocol}://${hostname}`;
      let oI = splitUp[4];

      // console.log("Splitup length: " + splitUp.length);

      if (splitUp.length >= 6 && splitUp[5] === 'DRAFT') {
        // We have a draft.
        oI += '/DRAFT';
      }

      // BAD fix, should have apiinfo stored as object...
      let foundToken = '';
      let foundGroups = [];
      let objectStuff = {};

    try {
        JSON.parse(localStorage.getItem('user')).apiinfo.map((item) => {
            // console.log("Public hostname: " + item.public_hostname);
            if (item.public_hostname === hostname) {
            foundToken = item.token;
            // console.log("Found token: " + item.token);
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
            return true;
        });} catch (error){
            console.log(error)
        }

      const requestForDraft = `${hostname}/${oI}`;

      // Ask the server for the contents.
      fetch(requestForDraft, {
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
          // console.log('Server return contents: ', foundToken);
          // Parse the results.
          // const parsed = JSON.parse(res.data)[0];

          // Set the object information.
          setObjectContents(response.data);
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
        if (response.status === 401) {
          setLoading(false);
        }
      }));
    }
  }, [parsePath]);

  return (
    <DeepContext.Provider value={{ objectOwner }}>
      <Page title="BioCompute Builder">
        <PermissionTools
          contents={objectContents}
          setObjectContents={setObjectContents}
          publish={publish}
          objectInformation={objectInformation}
          newDraft={newDraft}
          setPublish={setPublish}
          setMeEtagSet={setMeEtagSet}
          meEtagSet={meEtagSet}
        />
        <Views
          objectContents={objectContents}
          setObjectContents={setObjectContents}
          complianceCheck={complianceCheck}
          objectId={objectId}
          loading={loading}
          objectFound={objectFound}
          setMeEtagSet={setMeEtagSet}
          meEtagSet={meEtagSet}

        />
      </Page>
    </DeepContext.Provider>
  );
}

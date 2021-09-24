// src/views/builder/BuilderView/index.js

import React, { 
	createContext, 
	useEffect, 
	useState } 
from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

import Tools from './Tools';
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
  const [publish, setPublish] = useState(0);

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

  // For some reason had to have this in a state variable.
  const [objectId, setObjectId] = useState('');
  const [parsePath, setParsePath] = useState(useLocation().pathname);

  // All of the relevant things associated with an object ID.
  const [objectIdDerivatives, setObjectIdDerivatives] = useState({});

  // Who owns it?
  const [objectOwner, setObjectOwner] = useState('');

  // The PUBLISHED object ID.
  const [publishedObjectId, setPublishedObjectId] = useState('');

  // A provided default for the server to save the draft to.
  const [receivedDefault, setReceivedDefault] = useState(null);

  // ----- ACTIONS ----- //

  // ----- HELPER FUNCTIONS ----- //

  // Get usable information from the object ID.
  const extractObjectInfo = (oI) => {
    // Set the derivative variables.
    const splitHelper = oI.split('/');

    // A little bit of extra work for the hostname.
    let hostHelper = splitHelper.slice(0, 3);
    hostHelper.splice(1, 1);
    hostHelper[0] += '/';
    hostHelper = hostHelper.join('/');

    return ({
      rawName: oI,
      hostname: hostHelper,
      objectIdentifier: splitHelper.slice(splitHelper.length - 1, splitHelper.length)[0],
      table: splitHelper.slice(splitHelper.length - 1, splitHelper.length)[0].split('_').slice(0, 2).join('_').toLowerCase()
    });
  };

  // ----- SAVING ----- //

  // Define the possible actions on the page.
  useEffect(() => {
    // Get the object contents, then call
    // the server to save.

    if (saveDraft === 1) {
      // First, determine whether or not we're working
      // with a draft that has already been saved.
      // A draft has already been saved if its object
      // ID field is not blank.

      // TODO: bad fix here, need to have apiinfo be
      // an object rather than an array...
      let foundToken = '';

      JSON.parse(localStorage.getItem('user')).apiinfo.map((item) => {
        if (item.public_hostname === draftSavingLocation.hostname) {
          foundToken = item.token;
        }
      });

      // Determine the table to write to based on the
      // group name.

      // Determine whether or not we have an object ID,
      // then make the call based on that.
      if (objectId === '') {
        // Call the API.
        fetch(`${draftSavingLocation.hostname}/api/objects/drafts/create/`, {
          method: 'POST',
          body: JSON.stringify({
            POST_create_new_object: [
              {
                contents: objectContents,
                owner_group: draftSavingLocation.group,
                schema: 'IEEE',
                state: 'DRAFT',
                table: draftSavingLocation.group.replace('ers', '')
              }
            ]
          }),
          headers: {
            Authorization: `Token ${foundToken}`,
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((res) => res.json().then((data) => ({
          data,
          status: res.status
        })).then((res) => {
          // Did the request go ok or not?
          if (res.status === 200) {
            // Set the object ID.

            // MUST use a copy of the state variable.
            // Source: https://www.freecodecamp.org/news/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5/

            // The loading and object finding steps are necessary
            // to force a re-render apparently?

            // Now we're loading.
            setLoading(true);

            // The object hasn't been "found".
            setObjectFound(false);

            // TODO: may be a bit expensive to copy, could instead
            // set state value directly?
            const helper = { ...objectContents };
            helper.object_id = res.data[0].object_id;
            setObjectContents(helper);

            // Set the state.
            setObjectId(res.data[0].object_id);

            // Lock the savable server.
            setServerLock(true);

            // Done loading and "looking" for the object.
            setLoading(false);
            setObjectFound(true);
          }
        }));
      } else {
        // Call the API.
        fetch(`${draftSavingLocation.hostname}/api/objects/create/`, {
          method: 'POST',
          body: JSON.stringify({
            POST_create_new_object: [
              {
                contents: objectContents,
                object_id: objectId,
                owner_group: draftSavingLocation.group,
                schema: 'IEEE',
                state: 'DRAFT',
                table: draftSavingLocation.group.replace('ers', '')
              }
            ]
          }),
          headers: {
            Authorization: `Token ${foundToken}`,
            'Content-type': 'application/json; charset=UTF-8'
          }
        });
      }

      // Done saving.
      setSaveDraft(0);
    }
  }, [saveDraft]);

  // If the object ID changes,
  // set the derivative properties.
  useEffect(() => {
    // Set the derivative properties.
    console.log('objectId has changed: ', objectId);
    setObjectIdDerivatives(extractObjectInfo(objectId));
  }, [objectId]);

  // ----- PUBLISHING ----- //

  useEffect(() => {
    // Get the object contents, then call
    // the server to see if the object is compliant.
    // TODO: replace later with page-specific check.

    if (publish === 1) {
      // TODO: bad fix here, need to have apiinfo be
      // an object rather than an array...
      let foundToken = '';

      JSON.parse(localStorage.getItem('user')).apiinfo.map((item) => {
        if (item.public_hostname === publishSavingLocation.hostname) {
          foundToken = item.token;
        }
      });

      // Determine the table to write to based on the
      // group name.

      // Call the API.
      fetch(`${publishSavingLocation.hostname}/api/objects/create/`, {
        method: 'POST',
        body: JSON.stringify({
          POST_create_new_object: [
            {
              contents: objectContents,
              owner_group: publishSavingLocation.group,
              retain_draft: !deleteDraftPostPublish,
              schema: 'IEEE',
              state: 'PUBLISH',
              table: publishSavingLocation.group.replace('ers', '')
            }
          ]
        }),
        headers: {
          Authorization: `Token ${foundToken}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res) => res.json().then((data) => ({
        data,
        status: res.status
      })).then((res) => {
        // Did the request go ok or not?
        if (res.status === 200) {
          // Good request.
          setPublishMessage({
            status: 200,
            message: `The draft was successfully published on host ${publishSavingLocation.hostname} with object URI ${res.data[0].object_id}.`
          });

          // Set the published object ID.
          setPublishedObjectId(res.data[0].object_id);
        } else {
          // Bad request.
          setPublishMessage({
            status: 400,
            message: 'The draft was unable to be published.  The server said...'
          });
        }
      }));

      // Done publishing.
      setPublish(0);
    }
  }, [publish]);

  // ----- DOWNLOADING ----- //

  // For downloading the object.
  // Source: https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
  // Source: https://codepen.io/gladchinda/pen/GemGNG
  // Source: https://stackoverflow.com/a/26158579/5029459

  function downloadBlob(blob, filename) {
    // Create an object URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement('a');

    // Set the href and download attributes for the anchor element
    // You can optionally set other attributes like `title`, etc
    // Especially, if the anchor element will be attached to the DOM
    a.href = url;
    a.download = filename || 'download';

    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    const clickHandler = function () {
      setTimeout(() => {
        // Release the object URL
        URL.revokeObjectURL(url);

        // Remove the event listener from the anchor element
        this.removeEventListener('click', clickHandler);

        // Remove the anchor element from the DOM
        (this.remove && (this.remove(), 1))
        || (this.parentNode && this.parentNode.removeChild(this));
      }, 150);
    };

    // // Add the click event listener on the anchor element
    // // Comment out this line if you don't want a one-off download of the blob content
    a.addEventListener('click', clickHandler, false);

    // Programmatically trigger a click on the anchor element
    // Useful if you want the download to happen automatically
    // Without attaching the anchor element to the DOM
    // Comment out this line if you don't want an automatic download of the blob content
    a.click();

    // Return the anchor element
    // Useful if you want a reference to the element
    // in order to attach it to the DOM or use it in some other way
    return a;
  }

  useEffect(() => {
    // Get the object contents, then download.
    if (downloadDraft === 1) {
      const blob = new Blob([JSON.stringify(objectContents, null, 4)], { type: 'application/json' });

      downloadBlob(blob, 'draft_bco.json');
    }

    // No longer downloading.
    setDownloadDraft(0);
  }, [downloadDraft]);

  // ----- DELETING ----- //

  useEffect(() => {

    // Delete the object.

  }, [deleteDraft]);

  // ----- INITIAL RENDERING ----- //

  // Initial rendering.
  useEffect(() => {
    // See if we're dealing with a new or existing draft.
    // TODO: fix '/' re-directs in routes.js.
    const splitUp = parsePath.split('builder');

    if (splitUp[splitUp.length - 1] == '') {
      // NEW draft

      // Set the object contents to template values.
      setObjectContents({
        object_id: '',
        spec_version: 'IEEE',
        etag: '',
        provenance_domain: {
          name: '', version: '', created: '', modified: '', contributors: [{ contribution: ['createdBy'], name: '' }], license: ''
        },
        usability_domain: [''],
        description_domain: {
          keywords: [''],
          pipeline_steps: [{
            step_number: 0, name: '', description: '', input_list: [{ uri: { uri: '' } }], output_list: [{ uri: { uri: '' } }]
          }]
        },
        execution_domain: {
          script: [{ uri: { uri: '' } }], script_driver: '', software_prerequisites: [{ name: '', version: '', uri: { uri: '' } }], external_data_endpoints: [{ name: '', url: '' }], environment_variables: {}
        },
        io_domain: { input_subdomain: [{ uri: { uri: '' } }], output_subdomain: [{ mediatype: '', uri: { uri: '' } }] },
        parametric_domain: [{ param: '', value: '', step: '' }]
      });

      // No longer loading.
      setToolsLoading(false);
      setLoading(false);

      // The object was "found".
      setObjectFound(true);
    } else {
      // EXISTING draft

      // Take everything after the builder section.
      const splitAgain = splitUp[1].split('/');

      // Get the hostname and object ID.
      const hostname = `${splitAgain[1]}://${splitAgain[2]}`;
      const oI = `${hostname}/${splitAgain.slice(3, splitAgain.length)}`;

      // Now look for a token associated with the hostname.

      // BAD fix, should have apiinfo stored as object...
      let foundToken = '';
	  let foundGroups= [];

      JSON.parse(localStorage.getItem('user')).apiinfo.map((item) => {
        if (item.public_hostname === hostname) {
          foundToken = item.token;
		  foundGroups = item['other_info']['permissions']['groups'];
		  console.log("item: ",item['other_info']['permissions']['groups']);
        }
      });

      console.log('hostname: ', hostname);
      console.log('oI: ', oI);
      console.log('foundToken: ', foundToken);

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
      })).then((res) => {
        // Did the request go ok or not?
        if (res.status === 200) {
          console.log('Server return contents: ', foundToken);

          // Parse the results.
          // const parsed = JSON.parse(res.data)[0];

          // Set the object information.
          setObjectContents(res.data);

          // Set the draft saving location.
          setReceivedDefault(res.data.object_id);

          // Lock the savable server based on the information
          // associated with the draft.
          setServerLock(true);

          setDraftSavingLocation({
            hostname: hostname,
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

  // None.
  useEffect(() => {
    console.log('draftSavingLocation: ', draftSavingLocation);
  }, [draftSavingLocation]);

  return (
    toolsLoading === true
      ? null
      : (
        <DeepContext.Provider value={{ objectOwner }}>
          <div>
            <Tools
              objectIdDerivatives={objectIdDerivatives}
              setDraftSavingLocation={setDraftSavingLocation}
              setPublishSavingLocation={setPublishSavingLocation}
              setDownloadDraft={setDownloadDraft}
              setSaveDraft={setSaveDraft}
              setPublish={setPublish}
              complianceCheck={complianceCheck}
              setComplianceCheck={setComplianceCheck}
              objectId={objectId}
              publishedObjectId={publishedObjectId}
              setObjectId={setObjectId}
              serverLock={serverLock}
              publishMessage={publishMessage}
              receivedDefault={receivedDefault}
              setDeleteDraftPostPublish={setDeleteDraftPostPublish}
            />

            <Views
              downloadDraft={downloadDraft}
              setDownloadDraft={setDownloadDraft}
              saveDraft={saveDraft}
              setSaveDraft={setSaveDraft}
              objectContents={objectContents}
              setObjectContents={setObjectContents}
              publish={publish}
              setPublish={setPublish}
              complianceCheck={complianceCheck}
              objectId={objectId}
              loading={loading}
              objectFound={objectFound}
            />
          </div>
        </DeepContext.Provider>
      )
  );
}

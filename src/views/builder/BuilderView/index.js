// src/views/builder/BuilderView/index.js

import React, { 
	createContext, 
	useEffect, 
	useState } 
from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

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

  // ----- INITIAL RENDERING ----- //

  // Initial rendering.
  useEffect(() => {
    // See if we're dealing with a new or existing draft.
    // TODO: fix '/' re-directs in routes.js.
    const splitUp = parsePath.split('builder');

    if (splitUp[splitUp.length - 1] == '') {
      // NEW draft
      // Set the object contents to template values.
      const blankBco = {
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
      }
	  console.log('blank BCO', blankBco);
      setObjectContents(blankBco);
	  localStorage.setItem('bco', JSON.stringify(blankBco))
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
          localStorage.setItem('bco', JSON.stringify(res.data))
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

  return (
    <DeepContext.Provider value={{ objectOwner }}>
      <div>
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

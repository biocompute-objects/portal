import { TrendingUpRounded } from '@material-ui/icons';
import React, { createContext, useEffect, useState } from 'react';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useLocation } from 'react-router-dom';

// Tools
import Tools from './Tools';

// Views
import Views from './Views';

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

// Context for deep nestings.
export const DeepContext = createContext();

export default function BuilderView() {
  
  // Set the state.
  //const [loading, setLoading] = useState(true);
  //const [objectFound, setObjectFound] = useState();
  //const [objectInfo, setObjectInfo] = useState();

  // The actual object contents.
  const [objectContents, setObjectContents] = useState({});

  // A variable to indicate that we are still loading
  // the tools.
  const [toolsLoading, setToolsLoading] = useState(true);

  // A variable to indicate that we are still loading
  // the builder.
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

  // For downloading drafts.
  const [downloadDraft, setDownloadDraft] = useState(0);

  // For deleting drafts.
  const [deleteDraft, setDeleteDraft] = useState(0);

  // Where are we saving either a draft or a published object?
  const [savingLocation, setSavingLocation] = useState([]);

  // Was the initial draft successfuly created OR are we working
  // with a draft that was save previously?
  const [serverLock, setServerLock] = useState(false);

  // For some reason had to have this in a state variable.
  const [objectId, setObjectId] = useState('');
  const [parsePath, setParsePath] = useState(useLocation().pathname);

  // Was this draft retrieved (i.e. from a link?)
  const [retrievedDraft, setRetrievedDraft] = useState(true);

  // Who owns it?
  const [objectOwner, setObjectOwner] = useState('');

  // Behavior for urls (the table and data to use are based on the URL)
  // https://.../builder -> ask for a new draft ID
  // https://.../builder/PREFIX_DRAFT_... -> load the draft information.

  
  // ----- ACTIONS ----- //


  // ----- SAVING ----- //


  // Define the possible actions on the page.
  useEffect(() => {
    
    // Get the object contents, then call
    // the server to save.

    if(saveDraft === 1) {

      // First, determine whether or not we're working
      // with a draft that has already been saved.
      // A draft has already been saved if its object
      // ID field is not blank.

      // TODO: bad fix here, need to have apiinfo be
      // an object rather than an array...
      var foundToken = '';

      JSON.parse(localStorage.getItem('user'))['apiinfo'].map(item => {
        if(item['public_hostname'] === savingLocation['hostname']) {
          foundToken = item['token'];
        }
      });

      // Determine the table to write to based on the
      // group name.
      
      // Call the API.
      fetch(savingLocation['hostname'] + '/api/objects/create/', {
        method: 'POST',
        body: JSON.stringify({
          POST_create_new_object: [
              {
                contents: objectContents,
                owner_group: savingLocation['group'],
                schema: 'IEEE',
                state: 'DRAFT',
                table: savingLocation['group'].replace('ers', '')
              }
          ]
      }),
      headers: {
        'Authorization': 'Token ' + foundToken,
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(res => res.json().then(data => ({
        data: data,
        status: res.status
      })).then(res => {
        
        // Did the request go ok or not?
        if(res.status === 200) {

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
          var helper = Object.assign({}, objectContents);
          helper['object_id'] = res.data[0]['object_id'];
          setObjectContents(helper);

          // Lock the savable server.
          setServerLock(true);

          // Done loading and "looking" for the object.
          setLoading(false);
          setObjectFound(true);

        }

      }))

      // Done saving.
      setSaveDraft(0);
      
    }

  }, [saveDraft]);

  // Testing only.
  useEffect(() => {
    console.log('savingLocation: ', savingLocation)
  }, [savingLocation]);

  useEffect(() => {
    console.log('objectContents: ', objectContents)
  }, [objectContents]);


  // ----- PUBLISHING ----- //


  useEffect(() => {
    
    // Get the object contents, then call
    // the server to see if the object is compliant.
    // TODO: replace later with page-specific check.

    if(publish === 1) {

      // TODO: bad fix here, need to have apiinfo be
      // an object rather than an array...
      var foundToken = '';

      JSON.parse(localStorage.getItem('user'))['apiinfo'].map(item => {
        if(item['public_hostname'] === savingLocation['hostname']) {
          foundToken = item['token'];
        }
      });

      // Determine the table to write to based on the
      // group name.
      
      // Call the API.
      fetch(savingLocation['hostname'] + '/api/objects/create/', {
        method: 'POST',
        body: JSON.stringify({
          POST_create_new_object: [
              {
                contents: objectContents,
                owner_group: savingLocation['group'],
                schema: 'IEEE',
                state: 'DRAFT',
                table: savingLocation['group'].replace('ers', '')
              }
          ]
      }),
      headers: {
        'Authorization': 'Token ' + foundToken,
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(res => res.json().then(data => ({
        data: data,
        status: res.status
      })).then(res => {
        
        // Did the request go ok or not?
        if(res.status === 200) {

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
          var helper = Object.assign({}, objectContents);
          helper['object_id'] = res.data[0]['object_id'];
          setObjectContents(helper);

          // Lock the savable server.
          setServerLock(true);

          // Done loading and "looking" for the object.
          setLoading(false);
          setObjectFound(true);

        }

      }))

      // Done saving.
      setSaveDraft(0);
      
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
    const clickHandler = function() {
      setTimeout(() => {
        // Release the object URL
        URL.revokeObjectURL(url);
        
        // Remove the event listener from the anchor element
        this.removeEventListener('click', clickHandler);
        
        // Remove the anchor element from the DOM
        (this.remove && (this.remove(), 1)) ||
        (this.parentNode && this.parentNode.removeChild(this));
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
    if(downloadDraft === 1) {

      const blob = new Blob([JSON.stringify(objectContents, null, 4)], { type: 'application/json' });

      downloadBlob(blob, 'draft_bco.json');

    }
    
    // No longer downloading.
    setDownloadDraft(0)

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

    if(splitUp[splitUp.length - 1] == "") {
      
      // New draft.
      setObjectId('newDraft');

      // Set the object contents to template values.
      setObjectContents({"object_id": "","spec_version":"IEEE","etag":"","provenance_domain":{"name":"","version":"","created":"","modified":"","contributors":[{"contribution":["createdBy"],"name":""}],"license":""},"usability_domain":[""],"description_domain":{"keywords":[""],"pipeline_steps":[{"step_number":0,"name":"","description":"","input_list":[{"uri":{"uri":""}}],"output_list":[{"uri":{"uri":""}}]}]},"execution_domain":{"script":[{"uri":{"uri":""}}],"script_driver":"","software_prerequisites":[{"name":"","version":"","uri":{"uri":""}}],"external_data_endpoints":[{"name":"","url":""}],"environment_variables":{}},"io_domain":{"input_subdomain":[{"uri":{"uri":""}}],"output_subdomain":[{"mediatype":"","uri":{"uri":""}}]},"parametric_domain":[{"param":"","value":"","step":""}]});

      // Draft was NOT retrieved from a link.
      setRetrievedDraft(false);
      
      // No longer loading.
      setToolsLoading(false);
      setLoading(false);

      // The object was "found".
      setObjectFound(true);

    } else {

      // TODO: bad fix here, token should be pulled
      // from user's information...
      
      // Take everything after the builder section.
      const splitAgain = parsePath.split('/builder/')[1].replace('/', '://');
      const fT = splitAgain.split('/linked/')[1];

      // Get the object ID so that we can get permissions.
      const oI = splitAgain.split('/linked/')[0];

      // Ask the server for the contents.
      fetch(splitAgain, {
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + fT,
          "Content-type": "application/json; charset=UTF-8"
      }
      }).then(res => res.json().then(data => ({
        data: data,
        status: res.status
      })).then(res => {
        
        // Did the request go ok or not?
        if(res.status === 200) {

          console.log(JSON.parse(res.data)[0])

          // Parse the results.
          const parsed = JSON.parse(res.data)[0];

          // Set the object information.
          setObjectContents(parsed['fields']['contents'])

          // Lock the savable server based on the information
          // associated with the draft.
          setServerLock(true);

          // setLoading and setObjectFound MUST be within
          // the response section of this fetch so as to
          // not be fired before the response is done.
          
          // TODO: improve error checking here to check for
          // an invalid object ID.

          // The draft was retrieved.
          setRetrievedDraft(true);

          // Who created it?
          setObjectOwner(parsed['fields']['public_hostname'] + ' - ' + parsed['fields']['human_readable_hostname'] + ' (' + parsed['fields']['owner_group'] + ')')

          // Get the permissions.
          setObjectId(parsePath);
          
          // No longer loading.
          setToolsLoading(false);
          setLoading(false);

          // The object was found.
          setObjectFound(true);

        }

      }))

    }

  }, []);


  
  
  // // Are we working with a new draft object or an existing one?
  // if(parsePath.indexOf('DRAFT') === -1) {

  //   // New object.  We have to wait for the user to
  //   // ask for a new object ID using a specified prefix.

  // } else {
    
  //   // Check against the REGEX to determine the table
  //   // and object ID.

  //   // Simply check for two underscores for a draft table,
  //   // otherwise we have a publish table.

  //   var tableName = '';

  //   if(parsePath.indexOf('_') != parsePath.lastIndexOf('_')) {

  //     // Draft table.
  //     tableName = parsePath.split('/')[2].split('_');
  //     tableName = [tableName[0], tableName[1]].join('_').toLowerCase();

  //   } else {

  //     // Publish table.
  //     tableName = parsePath.split('/')[2].split('_')[0].toLowerCase() + '_publish';

  //   }

  //   // Remove the 'builder' part of the URI.

  //   // First, see where the 'builder' part is.
  //   const builderIndex = window.location.href.indexOf('/builder');

  //   // Now drop this part of the string.
  //   var objectId = window.location.href.substr(0, builderIndex) + window.location.href.substr(builderIndex+8, window.location.href.length);

  //   console.log("===================================", objectId)
  //   // Mods for local dev
  //   if(objectId.indexOf(':3000') !== -1) {
  //       objectId = objectId.substring(0, objectId.indexOf(':3000')) +
  //       objectId.substring(objectId.indexOf(':3000') + 5, objectId.length)
  //   console.log("===================================", objectId)
  //   }
  // }
  
  return (
    toolsLoading === true
      ?
        null
      :
        <DeepContext.Provider value={{ retrievedDraft, objectOwner }}>
          <div>
            <Tools savingLocation = { savingLocation } setSavingLocation = { setSavingLocation } setDownloadDraft = { setDownloadDraft } setSaveDraft = { setSaveDraft } setPublish = { setPublish } complianceCheck = { complianceCheck } setComplianceCheck = { setComplianceCheck } objectId = { objectId } serverLock = { serverLock } />
            <Views downloadDraft = { downloadDraft } setDownloadDraft = { setDownloadDraft } saveDraft = { saveDraft } setSaveDraft = { setSaveDraft } objectContents = { objectContents } setObjectContents = { setObjectContents } publish = { publish } setPublish = { setPublish } complianceCheck = { complianceCheck } objectId = { objectId } loading = { loading } objectFound = { objectFound } />
          </div>
        </DeepContext.Provider>
  );
}

// For saving drafts
useEffect(() => {

    // Default to the loading state.
    //setLoading(true);

    // Update the draft.    
    if(saveDraft === 1) {

      // TODO: Find cleaner way to send this?
      // De-structure the URL.

      // Split the URI and re-construct the route.
      const splitUp = window.location.href.split('/');
      const destructured = splitUp[0] + '//' + splitUp[2] + '/' + splitUp[4];
      
      // Call the API.
      fetch(fc['sending']['bco_api_objects_create'], {
        method: 'POST',
        body: JSON.stringify({
          POST_create_new_object: [
              {
                table: 'bco_draft',
                object_id: destructured,
                schema: 'IEEE',
                contents: {
                  "object_id": destructured,
                  "etag": contents.eTag,
                  "spec_version": "IEEE",
                  "provenance_domain": {
                    "name": pdName,
                    "version": pdVersion,
                    "created": pdCreated,
                    "modified": pdModifed,
                    "contributors": pdContributors,
                    "license": pdLicense
                  },
                  "usability_domain": ud,
                  "description_domain": {
                    "keywords": ddKeywords,
                    "pipeline_steps": ddPipelineSteps
                  },
                  "execution_domain": {
                    "script": edScript,
                    "script_driver": edScriptDriver,
                    "software_prerequisites": edSoftwarePrerequisites,
                    "external_data_endpoints": edExternalDataEndpoints,
                    "environment_variables": edEnvironmentVariables
                  },
                  "io_domain": {
                    "input_subdomain": iodInputSubdomain,
                    "output_subdomain": iodOutputSubdomain
                  },
                  "parametric_domain": pad,
                  "error_domain": errd,
                  "extension_domain": exd
                },
                state: 'DRAFT'
              }
          ]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(response=>response.json()).then(data => {
        
        console.log('+++++++++++++++++', data);

        // Get the bulk response.
        const bulkResponse = data.POST_create_new_object[0];

        // Was the object found?
        if(bulkResponse.request_code === '200') {
          
          // We found the object, so set the data.
          alert('The object with ID \n\n' + destructured + '\n\n was saved successfully.')

        } else {

          // There was a problem, so show what it was.
          alert('There was a problem saving the object with ID \n\n' + destructured + '\n\n  See errors below...\n\n' + bulkResponse.message);
    
        }

        // We're no longer saving.
        setSaveDraft(0);

      })
      
    }
    
  }, [saveDraft]);








  // For publishing drafts
  useEffect(() => {

    // Update the draft.    
    if(publish === 1) {

      // TODO: Find cleaner way to send this?
      // De-structure the URL.

      // Split the URI and re-construct the route.
      const splitUp = window.location.href.split('/');
      const destructured = splitUp[0] + '//' + splitUp[2] + '/' + splitUp[4];
      
      // Call the API.  
      fetch(fc['sending']['bcoapi_objects_create'], { 
        method: 'POST',
        body: JSON.stringify({
          POST_create_new_object: [
              {
                table: 'bco_publish',
                schema: 'IEEE',
                contents: {
                  "object_id": destructured,
                  "etag": contents.eTag,
                  "spec_version": "IEEE",
                  "provenance_domain": {
                    "name": pdName,
                    "version": pdVersion,
                    "created": pdCreated,
                    "modified": pdModifed,
                    "contributors": pdContributors,
                    "license": pdLicense
                  },
                  "usability_domain": ud,
                  "description_domain": {
                    "keywords": ddKeywords,
                    "pipeline_steps": ddPipelineSteps
                  },
                  "execution_domain": {
                    "script": edScript,
                    "script_driver": edScriptDriver,
                    "software_prerequisites": edSoftwarePrerequisites,
                    "external_data_endpoints": edExternalDataEndpoints,
                    "environment_variables": edEnvironmentVariables
                  },
                  "io_domain": {
                    "input_subdomain": iodInputSubdomain,
                    "output_subdomain": iodOutputSubdomain
                  },
                  "parametric_domain": pad,
                  "error_domain": errd,
                  "extension_domain": exd
                },
                state: 'PUBLISHED'
              }
          ]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(response=>response.json()).then(data=>{
        
        console.log('+++++++++++++++++', data);

        // Get the bulk response.
        const bulkResponse = data.POST_create_new_object[0];

        // Was the object found?
        if(bulkResponse.request_code === '200') {
          
          // We found the object, so set the data.
          alert('The object with ID \n\n' + destructured + '\n\n was saved successfully with ID \n\n' + bulkResponse['object_id'] + '\n\nClosing this alert will re-direct you to the object view page for this object.')

        } else {

          // There was a problem, so show what it was.
          alert('There was a problem saving the object with ID \n\n' + destructured + '\n\nSee errors below...\n\n' + bulkResponse.message);
    
        }

        // We're no longer publishing.
        setPublish(0);

      })

    }
    
  }, [publish]);





  useEffect(() => {

    //TODO: This has been fixed with proper routing...
    
    // Default to the loading state.
    setLoading(true);

    // // Were a table and object ID provided?
    // if(typeof(table) === 'undefined' || typeof(objectId) === 'undefined') {

    //   // We need a new draft object.
    //   newDraftObject();

    // } else {
      
    //   // Look for the object ID provided.
    //   getObjectInfo();

    // }

    // Are we working with a new or existing draft?
    if(objectId === 'draft') {

      // Set generic object information.
      setObjectInfo(JSON.parse('{"spec_version":"IEEE","etag":"0","provenance_domain":{"name":"","version":"","created":"","modified":"","contributors":[{"contribution":["createdBy"],"name":""}],"license":""},"usability_domain":[""],"description_domain":{"keywords":[""],"pipeline_steps":[{"step_number":0,"name":"","description":"","input_list":[{"uri":{"uri":""}}],"output_list":[{"uri":{"uri":""}}]}]},"execution_domain":{"script":[{"uri":{"uri":""}}],"script_driver":"","software_prerequisites":[{"name":"","version":"","uri":{"uri":""}}],"external_data_endpoints":[{"name":"","url":""}],"environment_variables":{}},"io_domain":{"input_subdomain":[{"uri":{"uri":""}}],"output_subdomain":[{"mediatype":"","uri":{"uri":""}}]},"parametric_domain":[{"param":"","value":"","step":""}]}'));

      // We're no longer loading.
      setObjectFound(true);
      setLoading(false);
    
    } else {

      // Look for the object ID provided.
      getObjectInfo();

    }
    
  }, []);





  // TODO: Change to POST request later.
  // TODO: Don't use wheel key!
  const getObjectInfo = () => {
    
    // Call the API.
    fetch(objectId, {
      
      method: 'GET',
      headers: {
        "Authorization": "Token a8e6776bd146ad65b405f0b9cbaaa44c93baf780",
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response=>response.json()).then(data=>{
      
      console.log('+++++++++++++++++', data);

      // Get the bulk response.
      const bulkResponse = data;

      // We found the object, so set the data.
      setObjectInfo(JSON.parse(bulkResponse)[0]['fields']['contents']);
      setObjectFound(true);

      // // Was the object found?
      // if(bulkResponse.request_code === '200') {
        
      //   // We found the object, so set the data.
      //   setObjectInfo(JSON.parse(bulkResponse));
      //   setObjectFound(true);

      // } else {

      //   // There was a problem, so show what it was.
      //   setObjectInfo(bulkResponse.message);
      //   setObjectFound(false);
  
      // }

      // We're no longer loading.
      setLoading(false);

    })
  }






// Use the parent context.
  // Source: https://www.digitalocean.com/community/tutorials/react-usecontext

  // As of 1/29/21, there is a problem in React with this function call.
  // Source: https://stackoverflow.com/questions/62564671/using-usecontext-in-react-doesnt-give-me-the-expect-data

  // Pull the state from the parent.
  //const { 
  //  view
  //} = useContext(DisplayContext);





  // Make the request to the API, then pass the
  // result to the children.

  // Source: https://www.bitnative.com/2020/07/06/four-ways-to-fetch-data-in-react/
  // Source: https://stackoverflow.com/questions/60888028/how-to-wait-for-fetch-before-rendering-data-in-functional-component

  // Construct the request.

  // Fetch behavior requires further processing.

  // Source: https://stackoverflow.com/questions/43903767/read-the-body-of-a-fetch-promise

  // TODO: fix this call later to not rely on the URL passed in?
  // TODO: fix this later to allow for the use of prefixes.
   //    attach_id: 'True',

   let history = useNavigate();
  
   // Redirect
   function redirect(where) {
     return history(where);
   }
 
   // If no object ID is provided, then a new one is generated.
   const newDraftObject = () => {
     
     // Object ID and eTag are generated on server.
 
     // DRAFT template.  Only required fields from the top-level with
     // no break in the requirement chain for descendents are generated
     // here.
 
     // Some fields (e.g. "contributors") must be provided a default value.
     // Sensible values will be given where possible.
     
     // Call the API.
     fetch(fc['sending']['bcoapi_objects_create'], {
       method: 'POST',
       body: JSON.stringify({
         POST_create_new_object: [
             {
               table: 'bco_draft',
               schema: 'IEEE',
               contents: JSON.parse('{"spec_version":"IEEE","etag":"0","provenance_domain":{"name":"","version":"","created":"","modified":"","contributors":[{"contribution":["createdBy"],"name":""}],"license":""},"usability_domain":[""],"description_domain":{"keywords":[""],"pipeline_steps":[{"step_number":0,"name":"","description":"","input_list":[{"uri":{"uri":""}}],"output_list":[{"uri":{"uri":""}}]}]},"execution_domain":{"script":[{"uri":{"uri":""}}],"script_driver":"","software_prerequisites":[{"name":"","version":"","uri":{"uri":""}}],"external_data_endpoints":[{"name":"","url":""}],"environment_variables":{}},"io_domain":{"input_subdomain":[{"uri":{"uri":""}}],"output_subdomain":[{"mediatype":"","uri":{"uri":""}}]},"parametric_domain":[{"param":"","value":"","step":""}]}'),
               state: 'DRAFT'
             }
         ]
     }),
     headers: {
       "Content-type": "application/json; charset=UTF-8"
     }
     }).then(response=>response.json()).then(data=>{
 
       console.log('NEW DRAFT OBJECT: ', data);
 
       // Parse the response data for the URL to re-direct to,
       // making sure we're going to the BUILDER page.
 
       // Split the URI and re-construct the route.
       const splitUp = data.POST_create_new_object[0]['object_id'].split('/');
 
       // Now re-direct.
       redirect('/builder/' + splitUp[3]);
 
       // Crappy but works.
       // Source: https://reactgo.com/react-refresh-page/
       window.location.reload();
 
     })
   }  
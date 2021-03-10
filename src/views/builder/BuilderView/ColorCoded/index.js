import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

// Rendering dynamic JSON.
import Meta from './Meta'
import DescriptionDomain from './DescriptionDomain'
import ErrorDomain from './ErrorDomain'
import ExecutionDomain from './ExecutionDomain'
import ExtensionDomain from './ExtensionDomain'
import IoDomain from './IoDomain'
import ParametricDomain from './ParametricDomain'
import ProvenanceDomain from './ProvenanceDomain'
import UsabilityDomain from './UsabilityDomain'

// Checking for field value existence
import cF from '../../../../utils/cF'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  margined: {
    marginBottom: '100px'
  },
  meta: {
    backgroundColor: 'green',
    color: 'white'
  },
  productCard: {
    height: '100%'
  },
  descriptionDomain: {
    background: 'green'
  },
  errorDomain: {
    background: 'green'
  },
  executionDomain: {
    background: 'purple'
  },
  extensionDomain: {
    background: 'magenta'
  },
  ioDomain: {
    background: 'blue'
  },
  parametricDomain: {
    background: 'teal'
  },
  provenanceDomain: {
    background: 'purple'
  },
  usabilityDomain: {
    background: 'orange'
  }
}));

const ColorCoded = ({ saving, setSaving, publishing, setPublishing, compCheck, contents }) => {
  
  // contents is the actual object information.  
  console.log('^^^^', contents)

  const classes = useStyles();

  // Set fake data for missing domains.
  ['provenance_domain', 'usability_domain', 'description_domain', 'execution_domain', 'io_domain', 'parametric_domain', 'error_domain', 'extension_domain'].map(item => {
      if(!(item in contents)) {
        contents[item] = '';
      }
    }
  )
  console.log('######', contents)

  // Compliance-checking functions
  const checkBlank = (value) => {
    if(value === '' || value === "" || value === null) {
      return 1
    }
  }

  /*const checkUri = (value) => {
    need URI regex
  }*/

  /*const checkDateTime = (value) => {
    need specification on datetime format
  }*/
  
  // State

  // TODO: Make sure this is written correctly?

  // For saving drafts
  useEffect(() => {

    // Default to the loading state.
    //setLoading(true);

    // Update the draft.    
    if(saving === 1) {

      // TODO: Find cleaner way to send this?
      // De-structure the URL.

      // Split the URI and re-construct the route.
      const splitUp = window.location.href.split('/');
      const destructured = splitUp[0] + '//' + splitUp[2] + '/' + splitUp[4];
      
      // Call the API.    
      fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/create/', {
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
      }).then(response=>response.json()).then(data=>{
        
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
        setSaving(0);

      })
      
    }
    
  }, [saving]);

  // For publishing drafts
  useEffect(() => {

    // Update the draft.    
    if(publishing === 1) {

      // TODO: Find cleaner way to send this?
      // De-structure the URL.

      // Split the URI and re-construct the route.
      const splitUp = window.location.href.split('/');
      const destructured = splitUp[0] + '//' + splitUp[2] + '/' + splitUp[4];
      
      // Call the API.    
      fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/create/', {
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
        setPublishing(0);

      })

    }
    
  }, [publishing]);

  // Provenance domain
  const [pdName, setPdName] = useState(contents.provenance_domain.name);
  const [pdVersion, setPdVersion] = useState(contents.provenance_domain.version);
  const [pdLicense, setPdLicense] = useState(contents.provenance_domain.license);
  const [pdDerivedFrom, setPdDerivedFrom] = useState(contents.provenance_domain.derived_from);
  const [pdCreated, setPdCreated] = useState(contents.provenance_domain.created);
  const [pdModifed, setPdModified] = useState(contents.provenance_domain.modified);
  const [pdObsoleteAfter, setPdObsoleteAfter] = useState(contents.provenance_domain.obsolete_after);
  const [pdEmbargo, setPdEmbargo] = useState(contents.provenance_domain.embargo);
  const [pdReview, setPdReview] = useState(contents.provenance_domain.review);
  const [pdContributors, setPdContributors] = useState(contents.provenance_domain.contributors);

  // Usability domain
  const [ud, setUd] = useState(contents.usability_domain);

  // Description domain
  const [ddKeywords, setDdKeywords] = useState(contents.description_domain.keywords);
  const [ddPipelineSteps, setDdPipelineSteps] = useState(contents.description_domain.pipeline_steps);

  // Execution domain
  const [edScript, setEdScript] = useState(contents.execution_domain.script);
  const [edScriptDriver, setEdScriptDriver] = useState(contents.execution_domain.script_driver);
  const [edSoftwarePrerequisites, setEdSoftwarePrerequisites] = useState(contents.execution_domain.software_prerequisites);
  
  const [edExternalDataEndpoints, setEdExternalDataEndpoints] = useState(contents.execution_domain.external_data_endpoints);
  
  const [edEnvironmentVariables, setEdEnvironmentVariables] = useState(contents.execution_domain.environment_variables);
  
  // IO Domain
  const [iodInputSubdomain, setIodInputSubdomain] = useState(contents.io_domain.input_subdomain);
  const [iodOutputSubdomain, setIodOutputSubdomain] = useState(contents.io_domain.output_subdomain);  

  // Parameter domain
  const [pad, setPad] = useState(contents.parametric_domain);

  // Error domain
  const [errd, setErrd] = useState(contents.error_domain);

  // Extension domain
  const [exd, setExd] = useState(contents.extension_domain);

  // To trigger re-renders
  const [rerender, setRerender] = useState(0);
  
  // Generic add row
  /*const addRows = ({ stateVariable, stateVariableSetter, rowTemplate }) => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = stateVariable;

    // Push the new row.
    dummy.push(rowTemplate);

    // Update the state.
    stateVariableSetter(dummy);

    setRerender(rerender+1)

  }*/

  // Define the components to render.
  // Source: https://stackoverflow.com/questions/48131100/react-render-array-of-components
  // Source: https://stackoverflow.com/questions/43585840/react-render-dynamic-list-of-components

  // Note that the meta information is generated directly from the object,
  // but is not contained in the object itself.
  const meta = {
    "object_id": contents.object_id, 
    "spec_version": contents.spec_version,
    "etag": contents.eTag
  }

  const renderList = [ 
    meta, 
    { compCheck, checkBlank, pdName, pdVersion, pdLicense, pdDerivedFrom, pdCreated, pdModifed, pdObsoleteAfter, pdEmbargo, pdReview, pdContributors, rerender, setRerender, setPdName, setPdVersion, setPdLicense, setPdDerivedFrom, setPdCreated, setPdModified, setPdObsoleteAfter, setPdEmbargo, setPdReview, setPdContributors }, 
    { compCheck, checkBlank, ud, setUd },
    { compCheck, checkBlank, ddKeywords, ddPipelineSteps, rerender, setDdKeywords, setDdPipelineSteps, setRerender },
    { compCheck, checkBlank, edScript, edScriptDriver, edSoftwarePrerequisites, edExternalDataEndpoints, edEnvironmentVariables, setEdScript, setEdScriptDriver, setEdSoftwarePrerequisites, setEdExternalDataEndpoints, setEdEnvironmentVariables },
    { compCheck, checkBlank, iodInputSubdomain, iodOutputSubdomain, setIodInputSubdomain, setIodOutputSubdomain, rerender, setRerender },
    { compCheck, checkBlank, pad, rerender, setPad, setRerender },
    { compCheck, checkBlank, errd }, 
    { compCheck, checkBlank, exd }
  ];
  
  // TODO: CORRECT ORDER
  // const compList = [ Meta, ProvenanceDomain, UsabilityDomain, IoDomain, ExecutionDomain, DescriptionDomain, ParametricDomain, ErrorDomain, ExtensionDomain ];
  // const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'ioDomain', 'executionDomain', 'descriptionDomain', 'parametricDomain', 'errorDomain', 'extensionDomain' ];

  const compList = [ Meta, ProvenanceDomain, UsabilityDomain, DescriptionDomain ];
  const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'descriptionDomain' ];
 
  return (
    <Container maxWidth={false}>
      <Grid
        className={classes.margined}
        container
        spacing={3}
      >
        {
          compList.map((Component, index) => {
              return(
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Card className={classes[classNames[index]]}>
                    <Component items={renderList[index]} cF={cF} />
                  </Card>
                </Grid>
              )
            }
          )
        }
      </Grid>
    </Container>
  );
};

export default ColorCoded;
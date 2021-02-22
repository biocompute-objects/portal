import React, { useState } from 'react';
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
    background: 'red'
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

const ColorCoded = ({ contents }) => {
  
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
  
  // State
  const [pdName, setPdName] = useState(contents.provenance_domain.name);
  const [pdVersion, setPdVersion] = useState(contents.provenance_domain.version);
  const [pdLicense, setPdLicense] = useState(contents.provenance_domain.license);
  const [pdCreated, setPdCreated] = useState(contents.provenance_domain.created);
  const [pdModifed, setPdModified] = useState(contents.provenance_domain.modified);
  const [pdContributors, setPdContributors] = useState(contents.provenance_domain.contributors);
  const [pdRowTemplate, setPdRowTemplate] = useState({
    "name": "",
    "contribution": "",
    "affiliation": "",
    "email": "",
    "orcid": ""
  });

  const [ud, setUd] = useState(contents.usability_domain);

  const [ddKeywords, setDd] = useState(contents.description_domain.keywords);
  const [ddPipelineSteps, setDdPipelineSteps] = useState(contents.description_domain.pipeline_steps);

  const [edScript, setEdScript] = useState(contents.execution_domain.script);
  const [edScriptDriver, setEdScriptDriver] = useState(contents.execution_domain.script_driver);
  const [edSoftwarePrerequisites, setEdSoftwarePrerequisites] = useState(contents.execution_domain.software_prerequisites);
  const [edSoftwarePrerequisitesRowTemplate, setEdSoftwarePrerequisiteRowTemplate] = useState({
    "name": "",
    "version": "",
    "filename": "",
    "uri": "",
    "access_time": "",
    "sha1_checksum": ""
  });
  const [edExternalDataEndpoints, setEdExternalDataEndpoints] = useState(contents.execution_domain.external_data_endpoints);
  const [edExternalDataEndpointsRowTemplate, setEdExternalDataEndpointsRowTemplate] = useState({
    "name": "",
    "uri": ""
  });
  const [edEnvironmentVariables, setEdEnvironmentVariables] = useState(contents.execution_domain.environment_variables);
  const [edEnvironmentVariablesRowTemplate, setEdEnvironmentVariablesRowTemplate] = useState({
    "name": "",
    "uri": ""
  });

  const [iodInputSubdomain, setIodInputSubdomain] = useState(contents.io_domain.input_subdomain);
  const [iodOutputSubdomain, setIodOutputSubdomain] = useState(contents.io_domain.output_subdomain);  

  const [pad, setPad] = useState(contents.parametric_domain);

  const [errd, setErrd] = useState(contents.error_domain);

  const [exd, setExd] = useState(contents.extension_domain);

  // State
  /*const [rows, setRows] = useState(items.pipeline_steps);
  const [descriptionKeywords, setDescriptionKeywords] = useState(contents.description_domain.keywords)

  // Couldn't get the re-render to work without this.
  const [rerender, setRerender] = useState(0);

  // Remove row
  const removeRows = (which) => {

    var dummy = rows;
    dummy.splice(which, 1);
    setRows(dummy)

    setRerender(rerender+1)

  }
  
  // Add row
  const addRows = () => {

    // For some reason we can't have the push
    // call inside of setRows.
    var dummy = rows;
    dummy.push(
      {
        "step_number": "",
        "number": "",
        "name": "",
        "description": "",
        "input_list": "",
        "output_list": ""
      }
    )
    setRows(dummy)

    setRerender(rerender+1)
    
  }*/

  const [rerender, setRerender] = useState(0);
  
  // Generic add row
  const addRows = ({ stateVariable, stateVariableSetter, rowTemplate }) => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = stateVariable;

    // Push the new row.
    dummy.push(rowTemplate);

    // Update the state.
    stateVariableSetter(dummy);

    setRerender(rerender+1)

  }

  // Remove row
  /*const removeRows = (which) => {

    var dummy = rows;
    dummy.splice(which, 1);
    setRows(dummy)

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
    { pdName, pdVersion, pdLicense, pdCreated, pdModifed, pdContributors, pdRowTemplate, rerender, setRerender }, 
    { ud, setUd },
    { ddKeywords, ddPipelineSteps, rerender, setDdPipelineSteps, setRerender },
    { edScript, edScriptDriver, edSoftwarePrerequisites, edSoftwarePrerequisitesRowTemplate, edExternalDataEndpoints, edExternalDataEndpointsRowTemplate, edEnvironmentVariables, edEnvironmentVariablesRowTemplate },
    { iodInputSubdomain, iodOutputSubdomain, setIodInputSubdomain, setIodOutputSubdomain, rerender, setRerender },
    { pad, rerender, setPad, setRerender },
    { errd }, 
    { exd }
  ];
  const compList = [ Meta, ProvenanceDomain, UsabilityDomain, DescriptionDomain, ExecutionDomain, IoDomain, ParametricDomain, ErrorDomain ];
  const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'descriptionDomain', 'executionDomain', 'ioDomain', 'parametricDomain', 'errorDomain' ];

  // If a domain isn't defined at all, send a fake domain.  
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
                    <Component items={
                      typeof(renderList[index]) === 'undefined' ? {"fake": "fake"} : renderList[index]
                    } cF={cF} />
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
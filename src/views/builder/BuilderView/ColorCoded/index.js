// /src/views/builder/BuilderView/ColorCoded/index.js 

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
    background: '#74b3ce',
    color: 'white'
  },
  productCard: {
    height: '100%'
  },
  descriptionDomain: {
    background: '#09bc8a'
  },
  errorDomain: {
    background: '#3d5a80'
  },
  executionDomain: {
    background: '#3d5a80'
  },
  extensionDomain: {
    background: '#293241'
  },
  ioDomain: {
    background: '#98c1d9'
  },
  parametricDomain: {
    background: '#ee6c4d'
  },
  provenanceDomain: {
    background: '#172a3a'
  },
  usabilityDomain: {
    background: '#004346'
  }
}));

const ColorCoded = ({ complianceCheck, setComplianceCheck, objectContents, setObjectContents }) => {
  
  // As of 5/13/21, there is no relationship between the color-coded
  // draft view and the raw draft view.

  console.log('RENDER CHECK: ', objectContents)
  const classes = useStyles();

  // TODO: not necessary with re-factor code?

  // Set fake data for missing domains.
  // ['provenance_domain', 'usability_domain', 'description_domain', 'execution_domain', 'io_domain', 'parametric_domain', 'error_domain', 'extension_domain'].map(item => {
  //     if(!(item in contents)) {
  //       contents[item] = '';
  //     }
  //   }
  // )

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

  // Meta
  const [meObjectId, setMeObjectId] = useState(objectContents.object_id);
  const [meEtag, setMeEtag] = useState(objectContents.etag);

  // Provenance domain
  const [pdName, setPdName] = useState(objectContents.provenance_domain.name);
  const [pdVersion, setPdVersion] = useState(objectContents.provenance_domain.version);
  const [pdLicense, setPdLicense] = useState(objectContents.provenance_domain.license);
  const [pdDerivedFrom, setPdDerivedFrom] = useState(objectContents.provenance_domain.derived_from);
  const [pdCreated, setPdCreated] = useState(objectContents.provenance_domain.created);
  const [pdModifed, setPdModified] = useState(objectContents.provenance_domain.modified);
  const [pdObsoleteAfter, setPdObsoleteAfter] = useState(objectContents.provenance_domain.obsolete_after);
  const [pdEmbargoStartTime, setPdEmbargoStartTime] = useState(cF(cF(objectContents.provenance_domain.embargo)['start_time']));
  const [pdEmbargoEndTime, setPdEmbargoEndTime] = useState(cF(cF(objectContents.provenance_domain.embargo)['end_time']));
  const [pdReview, setPdReview] = useState(objectContents.provenance_domain.review);
  const [pdContributors, setPdContributors] = useState(objectContents.provenance_domain.contributors);

  // Usability domain
  const [ud, setUd] = useState(objectContents.usability_domain);

  // Description domain
  const [ddKeywords, setDdKeywords] = useState(objectContents.description_domain.keywords);
  const [ddPlatform, setDdPlatform] = useState(objectContents.description_domain.platform);
  const [ddXref, setDdXref] = useState(objectContents.description_domain.xref);
  const [ddPipelineSteps, setDdPipelineSteps] = useState(objectContents.description_domain.pipeline_steps);

  // Execution domain
  const [edScript, setEdScript] = useState(objectContents.execution_domain.script);
  const [edScriptDriver, setEdScriptDriver] = useState(objectContents.execution_domain.script_driver);
  const [edSoftwarePrerequisites, setEdSoftwarePrerequisites] = useState(objectContents.execution_domain.software_prerequisites);
  
  const [edExternalDataEndpoints, setEdExternalDataEndpoints] = useState(objectContents.execution_domain.external_data_endpoints);
  
  const [edEnvironmentVariables, setEdEnvironmentVariables] = useState(objectContents.execution_domain.environment_variables);
  
  // IO Domain
  const [iodInputSubdomain, setIodInputSubdomain] = useState(objectContents.io_domain.input_subdomain);
  const [iodOutputSubdomain, setIodOutputSubdomain] = useState(objectContents.io_domain.output_subdomain);  

  // Parametric domain
  const [pad, setPad] = useState(objectContents.parametric_domain);

  // Error domain
  const [errd, setErrd] = useState(objectContents.error_domain);

  // Extension domain
  const [exd, setExd] = useState(objectContents.extension_domain);

  // To trigger re-renders
  const [rerender, setRerender] = useState(0);

  // Define the components to render.
  // Source: https://stackoverflow.com/questions/48131100/react-render-array-of-components
  // Source: https://stackoverflow.com/questions/43585840/react-render-dynamic-list-of-components

  // Note that meta attributes have no setters as they
  // are set in the parent.
  const renderList = [ 
    { complianceCheck, meObjectId, meEtag, rerender, setRerender },
    { complianceCheck, checkBlank, pdName, pdVersion, pdLicense, pdDerivedFrom, pdCreated, pdModifed, pdObsoleteAfter, pdEmbargoStartTime, pdEmbargoEndTime, pdReview, pdContributors, rerender, setRerender, setPdName, setPdVersion, setPdLicense, setPdDerivedFrom, setPdCreated, setPdModified, setPdObsoleteAfter, setPdEmbargoStartTime, setPdEmbargoEndTime, setPdReview, setPdContributors }, 
    { complianceCheck, checkBlank, ud, setUd },
    { complianceCheck, checkBlank, iodInputSubdomain, iodOutputSubdomain, setIodInputSubdomain, setIodOutputSubdomain, rerender, setRerender },
    { complianceCheck, checkBlank, edScript, edScriptDriver, edSoftwarePrerequisites, edExternalDataEndpoints, edEnvironmentVariables, rerender, setEdScript, setEdScriptDriver, setEdSoftwarePrerequisites, setEdExternalDataEndpoints, setEdEnvironmentVariables, setRerender },
    { complianceCheck, checkBlank, ddKeywords, ddPlatform, ddXref, ddPipelineSteps, rerender, setDdKeywords, setDdPlatform, setDdXref, setDdPipelineSteps, setRerender },
    { complianceCheck, checkBlank, pad, rerender, setPad, setRerender },
    { complianceCheck, checkBlank, errd, setErrd }, 
    { complianceCheck, checkBlank, exd, setExd }
  ];

  const compList = [ Meta, ProvenanceDomain, UsabilityDomain, IoDomain, ExecutionDomain, DescriptionDomain, ParametricDomain, ErrorDomain, ExtensionDomain ];
  const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'ioDomain', 'executionDomain', 'descriptionDomain', 'parametricDomain', 'errorDomain', 'extensionDomain' ];

  // Listeners

  // Listen for ANY change to the object,
  // and kick back up everything.
  useEffect(() => {

    setObjectContents({
		"object_id": meObjectId,
		"spec_version":"IEEE",
		"eTag": meEtag,
		"provenance_domain":{
			"name": pdName,
			"version": pdVersion,
			"created": pdCreated,
			"modified": pdModifed,
			"review": pdReview,
			"contributors": pdContributors,
			"license": pdLicense},
		"usability_domain": ud,
		"description_domain":{
			"keywords": ddKeywords,
			"pipeline_steps": ddPipelineSteps},
		"execution_domain":{
			"script": edScript,
			"script_driver": edScriptDriver,
			"software_prerequisites": edSoftwarePrerequisites,
			"external_data_endpoints": edExternalDataEndpoints,
			"environment_variables": edEnvironmentVariables},
		"io_domain":{
			"input_subdomain": iodInputSubdomain,
			"output_subdomain": iodOutputSubdomain},
		"parametric_domain": pad,
		"error_domain": errd,
			"extension_domain": exd
		})

  }, [pdName, pdVersion, pdLicense, pdDerivedFrom, pdCreated, pdModifed, pdObsoleteAfter, pdEmbargoStartTime, pdEmbargoEndTime, pdReview, pdContributors, ud, ddKeywords, ddPlatform, ddXref, ddPipelineSteps, edScript, edScriptDriver, edSoftwarePrerequisites, edExternalDataEndpoints, edEnvironmentVariables, iodInputSubdomain, iodOutputSubdomain, pad, errd, exd]);
 
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
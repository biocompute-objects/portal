/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
// /src/views/builder/BuilderView/ColorCoded/index.js

import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

// Checking for field value existence
import cF from 'src/utils/cF';
import HelpBar from './HelpBar';
import Meta from './Meta';
import DescriptionDomain from './DescriptionDomain';
import ErrorDomain from './ErrorDomain';
import ExecutionDomain from './ExecutionDomain';
import ExtensionDomain from './ExtensionDomain';
import IoDomain from './IoDomain';
import ParametricDomain from './ParametricDomain';
import ProvenanceDomain from './ProvenanceDomain';
import UsabilityDomain from './UsabilityDomain';

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
    background: '#FDFEFE'
  },
  provenanceDomain: {
    background: '#EBEDEF'
  },
  usabilityDomain: {
    background: '#FDFEFE'
  },
  ioDomain: {
    background: '#EBEDEF'
  },
  executionDomain: {
    background: '#FDFEFE'
  },
  descriptionDomain: {
    background: '#EBEDEF'
  },
  parametricDomain: {
    background: '#FDFEFE'
  },
  errorDomain: {
    background: '#EBEDEF'
  },
  extensionDomain: {
    background: '#FDFEFE'
  }
}));

// Set the context.
// Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
export const ColorCodedContext = React.createContext();

function ColorCoded({
  complianceCheck, setComplianceCheck, objectContents, setObjectContents, setMeEtagSet, meEtagSet
}) {
  // As of 5/13/21, there is no relationship between the color-coded
  // draft view and the raw draft view.
  const classes = useStyles();

  // Compliance-checking functions
  const checkBlank = (value) => {
    if (value === '' || value === '' || value === null) {
      return 1;
    }
    return 0;
  };
  // Meta
  const [meObjectId, setMeObjectId] = useState(objectContents.object_id ? objectContents.object_id : '');
  const [meEtag, setMeEtag] = useState(objectContents.etag ? objectContents.etag : '');
  const [specVersion, setSpecVersion] = useState(objectContents.spec_version ? objectContents.spec_version : 'https://w3id.org/ieee/ieee-2791-schema/2791object.json');

  // Provenance domain
  const [provenanceDomain, setProvenanceDomain] = useState(objectContents.provenance_domain ? objectContents.provenance_domain : {});
  const [pdName, setPdName] = useState(provenanceDomain.name ? provenanceDomain.name : '');
  const [pdVersion, setPdVersion] = useState(provenanceDomain.version ? provenanceDomain.version : '');
  const [pdLicense, setPdLicense] = useState(provenanceDomain.license ? provenanceDomain.license : '');
  const [pdDerivedFrom, setPdDerivedFrom] = useState(provenanceDomain.derived_from);
  const date = new Date();
  const [pdCreated, setPdCreated] = useState(provenanceDomain.created ? provenanceDomain.created : date.toISOString());
  const [pdModifed, setPdModified] = useState(provenanceDomain.modified ? provenanceDomain.modified : date.toISOString());
  const [pdObsoleteAfter, setPdObsoleteAfter] = useState(provenanceDomain.obsolete_after);
  const [pdEmbargoStartTime, setPdEmbargoStartTime] = useState(cF(cF(provenanceDomain.embargo).start_time));
  const [pdEmbargoEndTime, setPdEmbargoEndTime] = useState(cF(cF(provenanceDomain.embargo).end_time));
  const [pdReview, setPdReview] = useState(provenanceDomain.review);
  // Because Contributor subfields are required (at least one), need to specify blank here
  const [pdContributors, setPdContributors] = useState(provenanceDomain.contributors ? provenanceDomain.contributors : [{ contribution: ['createdBy'], name: '' }]);

  // Usability domain
  const [ud, setUd] = useState(objectContents.usability_domain);

  // Description domain
  const [descriptionDomain, setDescriptionDomain] = useState(objectContents.description_domain ? objectContents.description_domain : {});
  const [ddKeywords, setDdKeywords] = useState(descriptionDomain.keywords);
  const [ddPlatform, setDdPlatform] = useState(descriptionDomain.platform);
  const [ddXref, setDdXref] = useState(descriptionDomain.xref);
  const [ddPipelineSteps, setDdPipelineSteps] = useState(descriptionDomain.pipeline_steps ? descriptionDomain.pipeline_steps : [{
    step_number: 0, name: '', description: '', prerequisite: [{ name: '', uri: { uri: '' } }], input_list: [{ uri: '' }], output_list: [{ uri: '' }]
  }]);

  // Execution domain
  const [executionDomain, setExecutionDomain] = useState(objectContents.execution_domain ? objectContents.execution_domain : {});
  const [edScript, setEdScript] = useState(executionDomain.script ? executionDomain.script : [{ uri: { uri: '' } }]);
  const [edScriptDriver, setEdScriptDriver] = useState(executionDomain.script_driver ? executionDomain.script_driver : '');
  const [edSoftwarePrerequisites, setEdSoftwarePrerequisites] = useState(executionDomain.software_prerequisites ? executionDomain.software_prerequisites : [{ name: '', version: '', uri: { uri: '' } }]);
  const [edExternalDataEndpoints, setEdExternalDataEndpoints] = useState(executionDomain.external_data_endpoints ? executionDomain.external_data_endpoints : [{ name: '', url: '' }]);

  const [edEnvironmentVariables, setEdEnvironmentVariables] = useState(executionDomain.environment_variables ? executionDomain.environment_variables : {});

  // IO Domain
  const [ioDomain, setIoDomain] = useState(objectContents.io_domain ? objectContents.io_domain : {});
  const [iodInputSubdomain, setIodInputSubdomain] = useState(ioDomain.input_subdomain);
  const [iodOutputSubdomain, setIodOutputSubdomain] = useState(ioDomain.output_subdomain);

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
    {
      complianceCheck, meObjectId, meEtagSet, setMeEtagSet, meEtag, setMeEtag, rerender, setRerender, objectContents
    },
    {
      complianceCheck, checkBlank, pdName, pdVersion, pdLicense, pdDerivedFrom, pdCreated, pdModifed, pdObsoleteAfter, pdEmbargoStartTime, pdEmbargoEndTime, pdReview, pdContributors, rerender, setRerender, setPdName, setPdVersion, setPdLicense, setPdDerivedFrom, setPdCreated, setPdModified, setPdObsoleteAfter, setPdEmbargoStartTime, setPdEmbargoEndTime, setPdReview, setPdContributors
    },
    {
      complianceCheck, checkBlank, ud, setUd, rerender, setRerender
    },
    {
      complianceCheck, checkBlank, exd, setExd, setRerender
    },
    {
      complianceCheck, checkBlank, ddKeywords, ddPlatform, ddXref, ddPipelineSteps, rerender, setDdKeywords, setDdPlatform, setDdXref, setDdPipelineSteps, setRerender
    },
    {
      complianceCheck, checkBlank, edScript, edScriptDriver, edSoftwarePrerequisites, edExternalDataEndpoints, edEnvironmentVariables, rerender, setEdScript, setEdScriptDriver, setEdSoftwarePrerequisites, setEdExternalDataEndpoints, setEdEnvironmentVariables, setRerender
    },
    {
      complianceCheck, checkBlank, iodInputSubdomain, iodOutputSubdomain, setIodInputSubdomain, setIodOutputSubdomain, rerender, setRerender
    },
    {
      complianceCheck, checkBlank, pad, rerender, setPad, setRerender
    },
    {
      complianceCheck, checkBlank, errd, setErrd
    }
  ];

  const compList = [Meta, ProvenanceDomain, UsabilityDomain, ExtensionDomain, DescriptionDomain, ExecutionDomain, IoDomain, ParametricDomain, ErrorDomain];
  const classNames = ['meta', 'provenanceDomain', 'usabilityDomain', 'extensionDomain', 'descriptionDomain', 'executionDomain', 'ioDomain', 'parametricDomain', 'errorDomain'];

  // Listeners
  // Listen for ANY change to the object,
  // and kick back up everything.
  useEffect(() => {
    const provModified = new Date();
    setObjectContents({
      object_id: meObjectId,
      spec_version: specVersion,
      etag: meEtag,
      provenance_domain: {
        name: pdName,
        version: pdVersion,
        created: pdCreated,
        derived_from: pdDerivedFrom,
        modified: provModified.toISOString(),
        review: pdReview,
        contributors: pdContributors,
        license: pdLicense
      },
      usability_domain: ud,
      description_domain: {
        keywords: ddKeywords,
        platform: ddPlatform,
        pipeline_steps: ddPipelineSteps
      },
      execution_domain: {
        script: edScript,
        script_driver: edScriptDriver,
        software_prerequisites: edSoftwarePrerequisites,
        external_data_endpoints: edExternalDataEndpoints,
        environment_variables: edEnvironmentVariables
      },
      io_domain: {
        input_subdomain: iodInputSubdomain,
        output_subdomain: iodOutputSubdomain
      },
      parametric_domain: pad,
      error_domain: errd,
      extension_domain: exd
    });
    // localStorage.setItem('bco', JSON.stringify(objectContents));
  }, [meEtag, pdName, pdVersion, pdLicense, pdDerivedFrom, pdCreated, pdModifed,
    pdObsoleteAfter, pdEmbargoStartTime, pdEmbargoEndTime, pdReview,
    pdContributors, ud, ddKeywords, ddPlatform, ddXref, ddPipelineSteps,
    edScript, edScriptDriver, edSoftwarePrerequisites, edExternalDataEndpoints,
    edEnvironmentVariables, iodInputSubdomain, iodOutputSubdomain, pad, errd, exd]);

  return (
    <ColorCodedContext.Provider value={{
      meEtagSet, setMeEtagSet
    }}
    >
      <Container maxWidth={false}>
        <Grid
          className={classes.margined}
          container
          spacing={3}
        >
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <HelpBar />
            </Card>
          </Grid>
          {compList.map((Component, index) => {
            return (
              <Grid key={index.toString()} item lg={12} md={12} xs={12}>
                <Card className={classes[classNames[index]]} key={`${index.toString()}_Card`}>
                  <Component items={renderList[index]} cF={cF} key={`${index.toString()}_Component`} />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ColorCodedContext.Provider>
  );
}

export default ColorCoded;

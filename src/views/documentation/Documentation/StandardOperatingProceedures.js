// src/views/documentation/Documantation/SoP.js

import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Box,
	Container,
	Grid,
	makeStyles,
	Typography
} from '@material-ui/core';
import ReactMarkdown from "react-markdown"; 

import OpacityIcon from '@material-ui/icons/Opacity';

import sop from "./MarkDowns/BCO_SOP.md"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '100px',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  marginTopped: {
    marginTop: '50px'
  },
  whiteBackground: {
    backgroundColor: '#ffffff'
  }
}));

function SoP() {
  const classes = useStyles();
  var certification = require('src/images/certification_requirements.png')
  return (
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={12}>
          <Grid item lg={8} sm={8} xl={8} xs={8}>
            <Typography>
  <h1>BCO Curation SOP</h1>
  <h3>Author: BioCompute Consortium</h3>
  <h3>Version: 2.0</h3>
  <h3>Effective Date: Aug 2020</h3>
  <h3>Intended audience: authors and developers</h3>

  The following recommendations are intended to provide guidance on BCO™ 
  creation, versioning, certification and authentication.<br/><br/>

  <h2>BCO IDs and Versioning</h2>
  <i><b>Intended Audience:</b> BCO authors</i><br/>
    <ul className={classes.bullet}>
      <li>BioCompute IDs are used as persistent URLs. A novel usability domain must 
  result in the creation of a new BCO with a new BCO ID. BCO IDs are immutable 
  upon creation, and are never deleted or retired. If the usability domain (UD) 
  remains unchanged, this results in a new version of the BCO. BCO ID example: 
  OMX_000001</li>
  
      <li>BCO major and minor versions can be incremented based on 
  project/institution documented policies.</li>
      <li>The BioCompute consortium maintains a database of registered 
  authorities. Registered authorities are able to assign their reserved prefixes 
  to their own IDs in the object_id field, such as OMX_000001. We encourage that 
  everyone registers a prefix at biocomputeobject.org.</li>
      </ul>
<br/>

  <h2>BioCompute Certification(s) and Authentication</h2>
  <i><b>Intended Audience:</b> commercial or academic entities looking for 
  additional BCO support</i>

<br/>

  <h3>Platform certification:</h3> A BioCompute “audit” will be conducted by the 
  BioCompute Consortium. Requirements include:
    <ul className={classes.bullet}>
      <li>IEEE-2791 conformant BCOs can be created</li>
      <li>Security (ex: immutable upon creation, secure sharing, platform 
		  security)</li>
      <li>Data QC processes on input/output</li>
    </ul>

<br/><br/>

  <h3>Syntactical certification:</h3> Code is available on GitHub for download 
  and use to ensure standard compliance.

<br/><br/>

  <h3>Scientific certification:</h3> BCO consortium members will participate in 
  the certification process; each certification process is projected to take ~ 3 
  months to 1 year for the development of pipelines. Verification Kit: 
  Input+output file(s) (in-silico generated), and Template BCO (tBCO) that 
  includes error domain).

<br/><br/>

  <h3>Template and Run Authentication:</h3> The Template BCO (tBCO) is created 
  once along with a Verification Kit. Verification Kit includes usually in silico 
  generated input files, BCO (with error domain) and output files. Run BCOs 
  (rBCO) uses the tBCOs, and the only changes allowed are in input (excluding 
  reference files/databases) and output files field. tBCOs and rBCOs can be 
  authenticated using secure blockchain technology.
    <ul className={classes.bullet}>
      <li>Template certification requirements: Input + output files</li>
      <li>Run certification requirements: certified template + run BCO (to 
  confirm that parameters and error domain are within range etc.)</li>
    </ul>
    <br/><img src={certification} width="75%" alt="Template and run 
      authentication"/>


  <h2>BCO Metadata</h2>
  The three metadata fields are filled out at the time of submission. Validity 
  check fills in the spec_version with the IEEE URL, an option to run a SHA256 
  (or just input your own hash value) for etag, and object_id is assigned (with 
  option to choose from any prefix associated with the account).

  <h2>Domain-specific guidance</h2>
  <h3>Execution domain</h3>
  When recording manual curation, the script field of the execution_domain 
  should link to a Google Document or GitHub markdown that describes the steps, 
  either programmatically or in a stepwise fashion. Manual curation steps should 
  ALSO be properly documented in the description_domain. An easy way to 
  conceptualize this is: Description domain is for people, Execution domain is 
  for machine (or programmers).

  <h3>Extension domain</h3>
  Format of how the schema would be defined: Execution domain

  <h3>Error domain</h3>
  This domain can support a “QA/QC rules” subdomain which provides rules that, 
  if the output file does not pass the appropriate criteria, then it is flagged 
  as an error.

  <h2>BCO Form-based portal</h2>
  <i><b>Intended Audience:</b> BCO tool developers and authors</i>

  BCOs can be created using any bioinformatics platform that has BCO read and 
  write functionalities. For users who do not have access to a bioinformatics 
  platform they can use the BCO Consortium Editor tool which has some of the 
  basic API functionalities:
    <ul className={classes.bullet}>
      <li>Create a BCO that is conformant to IEEE-2791.</li>
      <li>Upload BCOs in batch mode. The tool runs QA/QC processes on those 
  uploads and create unique IDs</li>
      <li>Search for existing BCOs by author/title/usability/keywords</li>
      <li>Download and install an instance within an organization’s firewall</li>
      <li>View videos and documentation on tool use</li>
  This documentation is currently in the comment phase until Sept. 15, 2020. 
  Please send your comments to Jonathon Keeney.
    </ul>
            </ Typography>
            <br/><br/><br/>
          </Grid>
        </Grid>
      </Container>
  );
};

export default SoP;

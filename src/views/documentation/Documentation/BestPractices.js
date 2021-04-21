// src/views/documentation/Documantation/about.js

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

import about from "./MarkDowns/about.md"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '100px',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    fontSize: '20px',
    transform: 'scale(0.8)',
  },
  marginTopped: {
    marginTop: '50px'
  },
  whiteBackground: {
    backgroundColor: '#ffffff'
  }
}));

function About() {
  const classes = useStyles();
  var about = require('src/images/logo.about.png')
  
  return (
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={12}>
          <Grid item xs={12} sm={12} lg={8} xl={8}>
            <div>
              <img src={about} width="75%" alt="BioCompute Logo" />
              <h1>BioCompute Objects Best Practice</h1>
            </div><br/>

           <div>

<Typography>
  <h2>General</h2>
    <ul className={classes.bullet}>
      <li>The required domains are defined by the IEEE . However, a BioCompute Object is considered complete when an Error Domain exists.</li>
      <li>Versioning is allowed, but only if the changes do not affect the workflow or output. BCO versioning follows a minor.patch schema, no major versions are allowed (substantial changes result in a new BCO). Minor changes are things like a change of contact information for a contributor, patch changes are things like spelling and grammar fixes.</li>
      <li>In general, any step that does not transform data does not need to be included in the Description Domain as a formal step, and can be described instead in the Usability Domain. For example, arranging rows and columns in a table, or formatting a figure. Steps that transform data should comprise their own step in the Description Domain.</li>
      <li>The Usability Domain should contain enough information to enable a naïve user generally skilled in bioinformatics to understand the analysis. This means that references to commonly used resources (such as basic Unix commands, well known databases like NCBI, basic terms like “alignment,” etc.) do not need to be explained, but references to less well known resources (such as obscure python packages, etc.) should be described. Description should be tailored to the intended audience, and BCOs intended for public consumption should assume a basic level of bioinformatics proficiency.</li>
    </ul>
</ Typography>

<Typography>
  <h2>BioCompute Registry</h2>
  The <a href="https://biocomputeobject.org/tst/registry.html" _target="blank">BioCompute Registry</a> 
is a domain registry for BCO IDs in which users can register their institution 
or organization. Similar to a website registry, this will allow the owner of 
that domain to use any domain organization of their choosing, and prevent naming 
collisions between groups. For example, the owner of “GW” can build BCOs 
  GW_0001.1, GW01A, GW_[lastname], or any other naming system of their preference, 
and these will not conflict with another registered domain, such as FDA_0001.1, 
etc. The BCO Registry registration numbers may not exceed five characters, and 
are recommended to be three characters. Any alphanumeric characters are acceptable.
  A BCO may be registered only by the author of the object, and the domain must 
be approved by the domain holder. Until automated systems are in place, register 
a BCO by sending the BCO ID and email of the registrant to the 
<a href="mailto:keeneyjg@gwu.edu" _target="blank" > BioCompute Team</a>. The 
following institutional domains have been reserved:<br/>
    <ol className={classes.bullet}>
      <li>GWU</li><li>FDA</li><li>NIH</li><li>CDC</li><li>NCI</li>
    </ol>
</ Typography>

< Typography>
  <h2>Preferred Ontologies</h2>
  <h3>Semantic Versioning</h3>
  BCO versioning should adhere to <a href="https://semver.org/" _target="blank">semantic 
versioning</a> to establish how version numbers are assigned and incremented. 
Given a version number MAJOR.MINOR.PATCH, when versioning a BCO increment the:<br/>
    <ol className={classes.bullet}>
      <li>MAJOR version when you make incompatible API changes,</li>
      <li>MINOR version when you add functionality in a backwards-compatible manner, and</li>
      <li>PATCH version when you make backwards-compatible bug fixes.</li>
    </ol><br/>
  Additional labels for pre-release and build metadata are available as 
extensions to the MAJOR.MINOR.PATCH format.
</ Typography>

< Typography>
  <h3>PAV Ontology and PROV-O </h3>
  To preserve the provenance of each BCO, the contribution type of the reviewers 
and contributors is a choice taken from PAV ontology: provenance, authoring and 
versioning, which also maps to the <a href="https://www.w3.org/TR/prov-o/" _target="blank">PROV-O</a>. 
The following are possible values for the status of an object in the review process:<br/>
    <ol className={classes.bullet}>
      <li>`unreviewed` flag indicates that the object has been submitted, but no further evaluation or verification has occurred.</li>
      <li>`in-review` flag indicates that verification is underway. </li>
      <li>`approved` flag indicates that the BCO has been verified and reviewed. </li>
      <li>`suspended` flag indicates an object that was once valid is no longer considered valid. </li>
      <li>`rejected` flag indicates that an error or inconsistency was detected in the BCO, and it has been removed or rejected.</li>
    </ol>
</ Typography>
< Typography>
<h3> Namespace: CURIE </h3>
  External references field contains a list of the databases and/or ontology IDs 
that are cross-referenced in the BCO. The external references are used to provide 
more specificity in the information related to BCO entries. Cross-referenced 
resources need to be available in the public domain. The external references are 
stored in the form of prefixed identifiers (CURIEs). These CURIEs map directly 
to the URIs maintained by <a href="identifiers.org" _target="blank">identifiers.org</a>. 
See <a href="" _target="blank">Section 3.5 of the BioCompute User Guide</a> for 
an example list of CURIEs and how they are used.
</ Typography>

</div>

            <br/><br/><br/>
          </Grid>
        </Grid>
      </Container>
  );
};

export default About;

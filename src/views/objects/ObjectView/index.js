import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';

// Rendering dynamic JSON.
import Meta from './Meta'
import DescriptionDomain from './DescriptionDomain'
import ProvenanceDomain from './ProvenanceDomain'
import RecursiveJson from './RecursiveJson'
import UsabilityDomain from './UsabilityDomain'

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
  provenanceDomain: {
    background: 'purple'
  },
  usabilityDomain: {
    background: 'orange'
  }
}));

const ObjectView = () => {
    
  const classes = useStyles();

  // Define the JSON object.
  /*const objected = {"object_id":"https://portal.aws.biochemistry.gwu.edu/bco/BCO_00015623","spec_version":"https://w3id.org/ieee/ieee-2791-schema/","etag":"86377b132f05ecfba148a94cddcd041e02024a5ee17a2c8425f44820876d76f9","description_domain":{"keywords":["microbiome","gut","composition","FilteredNT"],"platform":["HIVE"],"pipeline_steps":[{"step_number":1,"input_list":["none"],"output_list":[{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=alignment.hiveal"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_screenShannon.csv"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_screenResult.csv"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_acclist.csv"}],"name":"Screen Short Read Against Genome","description":"Random pick sequences to run alignment with specific genome"}]},"error_domain":{"empirical_error":{"text":"3.7% Bacteroides fragilis"},"algorithmic_error":{"text":"NA"}},"execution_domain":{"external_data_endpoints":[{"url":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=login","name":"HIVE"}],"environment_variables":[{"key":"HOSTTYPE","value":"x86_64-linux"}],"script_driver":"HIVE","software_prerequisites":[{"name":"Censuscope","version":"babajanian.1","uri":{"uri":"http://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=dna-alignx_screen&cmdMode=-","access_time":"2017-01-24T09:40:17-0500","sha1_checksum":"d60f506cddac09e9e816531e7905ca1ca6641e3c"}}],"script":[{"uri":{"uri":"http://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=dna-alignx_screen&cmdMode="}}]},"io_domain":{"input_subdomain":["none"],"output_subdomain":["none"]},"parametric_domain":[{"step":"1","value":"svc-dna-screening","param":"_type"},{"step":"1","value":"mgm4461125.3.050.upload.fna","param":"name"},{"step":"1","value":"1","param":"CensusIterations"},{"step":"1","value":"5","param":"CensuslimitIterations"},{"step":"1","value":"4000","param":"chunk_size"},{"step":"1","value":"0.0005","param":"cutOffvalue"},{"step":"1","value":"true","param":"filterNs"},{"step":"1","value":"0","param":"random_seed"},{"step":"1","value":"2500","param":"Sample"},{"step":"1","value":"0","param":"slice"},{"step":"1","value":"species","param":"taxDepth"},{"step":"1","value":"svc-align-blast","param":"alignSelector"},{"step":"1","value":"0","param":"automanual"},{"step":"1","value":"{\"26\":2218}","param":"query"},{"step":"1","value":"2242","param":"subject"},{"step":"1","value":"0","param":"resultInQueryDir"},{"step":"1","value":"false","param":"selfStopping"},{"step":"1","value":"true","param":"storeAlignments"},{"step":"1","value":"{\"blastWordSize\":28,\"blastMegablast\":true,\"blastevalue\":0.000001}","param":"blastparams"},{"step":"1","value":"{\"textBasedColumn\":0,\"textBasedFileSeparator\":1}","param":"censusScope_otherInput"}],"provenance_domain":{"embargo":"none","name":"CensuScope Test Computation","license":"https://spdx.org/licenses/CC-BY-4.0.html","review":[{"date":"2020-01-31T00:00:00-0400","reviewer":{"affiliation":"George Washington University","contribution":["contributedBy"],"name":"Charles Hadley King","email":"hadley_king@gwu.edu"},"status":"unreviewed"}],"version":"1.0.0","contributors":[{"affiliation":"","contribution":["createdBy"],"name":"FILL","email":"janishapatel@gwu.edu"},{"affiliation":"Creator","contribution":["createdBy"],"email":"demouser@demouser.com","name":"Demo User","orcid":""}],"created":"2020-12-24T03:42:50.182Z","modified":"2020-12-24T03:42:50.182Z"},"usability_domin":["This curated test pipeline evaluates the performance of CensuScope,  a tool designed and optimized for the quick detection of the components of a given NGS metagenomic data set, providing users with a species-level composition of a given sample. CensuScope was used to map a human gut microbiome sample (sourced from MG-RAST) against FilteredNT to view the sample’s taxonomic composition"]};*/

  const meta = {"object_id":"https://portal.aws.biochemistry.gwu.edu/bco/BCO_00015623","spec_version":"https://w3id.org/ieee/ieee-2791-schema/","etag":"86377b132f05ecfba148a94cddcd041e02024a5ee17a2c8425f44820876d76f9"};
  const descriptionDomain = {"keywords":["microbiome","gut","composition","FilteredNT"],"platform":["HIVE"],"pipeline_steps":[{"step_number":1,"input_list":["none"],"output_list":[{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=alignment.hiveal"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_screenShannon.csv"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_screenResult.csv"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_acclist.csv"}],"name":"Screen Short Read Against Genome","description":"Random pick sequences to run alignment with specific genome"}]};
  const provenanceDomain = {"embargo":"none","name":"CensuScope Test Computation","license":"https://spdx.org/licenses/CC-BY-4.0.html","review":[{"date":"2020-01-31T00:00:00-0400","reviewer":{"affiliation":"George Washington University","contribution":["contributedBy"],"name":"Charles Hadley King","email":"hadley_king@gwu.edu"},"status":"unreviewed"}],"version":"1.0.0","contributors":[{"affiliation":"","contribution":["createdBy","editedBy"],"name":"FILL","email":"janishapatel@gwu.edu"},{"affiliation":"Creator","contribution":["createdBy","reviewedBy","sentBy"],"email":"demouser@demouser.com","name":"Demo User","orcid":""}],"created":"2020-12-24T03:42:50.182Z","modified":"2020-12-24T03:42:50.182Z"};
  const usabilityDomain = ["This curated test pipeline evaluates the performance of CensuScope,  a tool designed and optimized for the quick detection of the components of a given NGS metagenomic data set, providing users with a species-level composition of a given sample. CensuScope was used to map a human gut microbiome sample (sourced from MG-RAST) against FilteredNT to view the sample’s taxonomic composition"];
  
  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
          <Grid
            className={classes.margined}
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
            <Card className={classes.meta} >
              <Meta items={meta} />
            </Card>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
            <Card className={classes.provenanceDomain} >
              <ProvenanceDomain items={provenanceDomain} />
            </Card>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
            <Card className={classes.usabilityDomain} >
              <UsabilityDomain items={usabilityDomain} />
            </Card>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
            <Card className={classes.descriptionDomain} >
              <DescriptionDomain items={descriptionDomain} />
            </Card>
            </Grid>
          </Grid>
      </Container>
    </Page>
  );
};

export default ObjectView;

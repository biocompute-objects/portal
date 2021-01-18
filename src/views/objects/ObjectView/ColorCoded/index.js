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
//import ErrorDomain from './ErrorDomain'
import ExecutionDomain from './ExecutionDomain'
//import ExtensionDomain from './ExtensionDomain'
import IoDomain from './IoDomain'
import ParametricDomain from './ParametricDomain'
import ProvenanceDomain from './ProvenanceDomain'
//import RecursiveJson from './RecursiveJson'
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
  errorDomain: {
    background: 'blue'
  },
  executionDomain: {
    background: 'red'
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

const ColorCoded = () => {
    
  const classes = useStyles();

  // Define the JSON object.
  /*
  const meta = {"object_id":"https://portal.aws.biochemistry.gwu.edu/bco/BCO_00015623","spec_version":"https://w3id.org/ieee/ieee-2791-schema/","etag":"86377b132f05ecfba148a94cddcd041e02024a5ee17a2c8425f44820876d76f9"};
  const descriptionDomain = {"keywords":["microbiome","gut","composition","FilteredNT"],"platform":["HIVE"],"pipeline_steps":[{"step_number":1,"input_list":[],"output_list":[{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=alignment.hiveal"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_screenShannon.csv"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_screenResult.csv"},{"uri":"https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=objFile&ids=3242&filename=dna-alignx_acclist.csv"}],"name":"Screen Short Read Against Genome","description":"Random pick sequences to run alignment with specific genome"}]};
  const provenanceDomain = {"embargo":"none","name":"CensuScope Test Computation","license":"https://spdx.org/licenses/CC-BY-4.0.html","review":[{"date":"2020-01-31T00:00:00-0400","reviewer":{"affiliation":"George Washington University","contribution":["contributedBy"],"name":"Charles Hadley King","email":"hadley_king@gwu.edu"},"status":"unreviewed"}],"version":"1.0.0","contributors":[{"affiliation":"","contribution":["createdBy","editedBy"],"name":"FILL","email":"janishapatel@gwu.edu"},{"affiliation":"Creator","contribution":["createdBy","reviewedBy","sentBy"],"email":"demouser@demouser.com","name":"Demo User","orcid":""}],"created":"2020-12-24T03:42:50.182Z","modified":"2020-12-24T03:42:50.182Z"};
  const usabilityDomain = ["This curated test pipeline evaluates the performance of CensuScope,  a tool designed and optimized for the quick detection of the components of a given NGS metagenomic data set, providing users with a species-level composition of a given sample. CensuScope was used to map a human gut microbiome sample (sourced from MG-RAST) against FilteredNT to view the sample’s taxonomic composition"];
  const executionDomain = {"script":[{"uri":{"uri":"https://example.com/workflows/antiviral_resistance_detection_hive.py"}}, {"uri":{"uri":"https://example.com/workflows/other_script.py"}}],"script_driver":"shell","software_prerequisites":[{"name":"HIVE-hexagon","version":"babajanian.1","uri":{"uri":"http://example.com/dna.cgi?cmd=dna-hexagon&cmdMode=-","access_time":"2017-01-24T09:40:17-0500","sha1_checksum":"d60f506cddac09e9e816531e7905ca1ca6641e3c"}},{"name":"HIVE-heptagon","version":"albinoni.2","uri":{"uri":"http://example.com/dna.cgi?cmd=dna-heptagon&cmdMode=-","access_time":"2017-01-24T09:40:17-0500"}}],"external_data_endpoints":[{"name":"HIVE","url":"http://example.com/dna.cgi?cmd=login"},{"name":"access to e-utils","url":"http://eutils.ncbi.nlm.nih.gov/entrez/eutils/"}],"environment_variables":{"HOSTTYPE":"x86_64-linux","EDITOR":"vim"}};
  const errorDomain = {"empirical_error":{"false_negative_alignment_hits":"<0.0010","false_discovery":"<0.05"},"algorithmic_error":{"false_positive_mutation_calls_discovery":"<0.00005","false_discovery":"0.005"}};
  const ioDomain = {"input_subdomain":[{"uri":{"filename":"Hepatitis C virus genotype 1","uri":"http://www.ncbi.nlm.nih.gov/nuccore/22129792","access_time":"2017-01-24T09:40:17-0500"}},{"uri":{"filename":"Hepatitis C virus type 1b complete genome","uri":"http://www.ncbi.nlm.nih.gov/nuccore/5420376","access_time":"2017-01-24T09:40:17-0500"}},{"uri":{"filename":"Hepatitis C virus (isolate JFH-1) genomic RNA","uri":"http://www.ncbi.nlm.nih.gov/nuccore/13122261","access_time":"2017-01-24T09:40:17-0500"}},{"uri":{"uri":"http://www.ncbi.nlm.nih.gov/nuccore/386646758","access_time":"2017-01-24T09:40:17-0500"}},{"uri":{"filename":"Hepatitis C virus S52 polyprotein gene","uri":"http://www.ncbi.nlm.nih.gov/nuccore/295311559","access_time":"2017-01-24T09:40:17-0500"}},{"uri":{"filename":"HCV1a_drug_resistant_sample0001-01","uri":"http://example.com/nuc-read/514682","access_time":"2017-01-24T09:40:17-0500"}},{"uri":{"filename":"HCV1a_drug_resistant_sample0001-02","uri":"http://example.com/nuc-read/514683","access_time":"2017-01-24T09:40:17-0500"}}],"output_subdomain":[{"mediatype":"text/csv","uri":{"uri":"http://example.com/data/514769/dnaAccessionBased.csv","access_time":"2017-01-24T09:40:17-0500"}},{"mediatype":"text/csv","uri":{"uri":"http://example.com/data/514801/SNPProfile*.csv","access_time":"2017-01-24T09:40:17-0500"}}]};
  const parametricDomain = [{"param":"seed","value":"14","step":"1"},{"param":"minimum_match_len","value":"66","step":"1"},{"param":"divergence_threshold_percent","value":"0.30","step":"1"},{"param":"minimum_coverage","value":"15","step":"2"},{"param":"freq_cutoff","value":"0.10","step":"2"}];
  */
  const dummy = {"object_id":"file:///usr/local/bin/carmst05/pipelines/templates/atomize.json","spec_version":"https://w3id.org/ieee/ieee-2791-schema/","eTag":"$VAR$","description_domain":{"keywords":["atomization","splitting","genome splitting","parallel pipelines","transcriptome splitting"],"platform":["CentOS7"],"pipeline_steps":[{"input_list":[{"access_time":"$VAR$","filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_raw/$VAR$"}],"prerequisite":[{"uri":{"uri":"https://github.com/benchworks/pro_split_files.r"},"name":"pro_split_files.r"}],"step_number":1,"name":"benchworks","description":"Splits files into pieces.","version":"0.0.1","output_list":[{"filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}]},{"input_list":[{"access_time":"$VAR$","filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}],"prerequisite":[{"uri":{"uri":"https://github.com/benchworks/pro_split_files_check.r"},"name":"pro_split_files_check.r"}],"step_number":2,"name":"benchworks","description":"Confirms that file splitting performed by pro_split_files.r was correct.","version":"0.0.1","output_list":[{"filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}]},{"input_list":[{"access_time":"$VAR$","filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}],"prerequisite":[{"uri":{"uri":"https://github.com/benchworks/pro_atomize.r"},"name":"pro_atomize.r"}],"step_number":3,"name":"benchworks","description":"Atomizes the split files based on the given parameters.","version":"0.0.1","output_list":[{"filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}]},{"input_list":[{"access_time":"$VAR$","filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}],"prerequisite":[{"uri":{"uri":"https://github.com/benchworks/pro_atomize_check.r"},"name":"pro_atomize_check.r"}],"step_number":4,"name":"benchworks","description":"Checks that the atomization performed was correct.","version":"0.0.1","output_list":[{"filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}]},{"input_list":[{"access_time":"$VAR$","filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}],"prerequisite":[{"uri":{"uri":"https://github.com/benchworks/pro_merge.r"},"name":"pro_merge.r"}],"step_number":5,"name":"benchworks","description":"Merges the atomized files.","version":"0.0.1","output_list":[{"filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}]},{"input_list":[{"access_time":"$VAR$","filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}],"prerequisite":[{"uri":{"uri":"https://github.com/benchworks/pro_split_files.r"},"name":"pro_split_files.r"}],"step_number":6,"name":"benchworks","description":"Split files into pieces.","version":"0.0.1","output_list":[{"filename":"$VAR$","uri":"file:///Data05/carmst1/amazon/data_output/$VAR$"}]}]},"execution_domain":{"environment_variables":{"Minimum_memory":"50GB"},"script":[{"uri":{"uri":"https://github.com/benchworks/pro_atomize.r","filename":"pro_atomize.r"}}],"script_driver":"R (command line)","external_data_endpoints":[],"software_prerequisites":[{"uri":{"uri":"https://cran.r-project.org/src/base/R-3/R-3.6.0.tar.gz"},"name":"R (command line)","version":">=3.6.0"},{"uri":{"uri":"https://github.com/benchworks/"},"name":"Benchworks","version":"0.0.1"}]},"io_domain":{"input_subdomain":[{"uri":{"access_time":"$VAR","filename":"$VAR$","uri":"$VAR$"}}],"output_subdomain":[{"uri":{"access_time":"$VAR","filename":"$VAR$","uri":"$VAR$"},"mediatype":"text/plain"}]},"parametric_domain":[{"param":"--raw-data-uri","value":"$VAR$","step":"1"},{"param":"--group-by","value":"$VAR$","step":"1"},{"param":"--data-output-uri","value":"$VAR$","step":"1"}],"provenance_domain":{"name":"Genome splitter","version":"1.0","license":"Trade secret of The University of Pennsylvania","contributors":[{"name":"Chris Armstrong","affiliation":"The University of Pennsylvania","contribution":["createdBy"],"email":"chrisarmstrong151@gmail.com","orcid":"https://orcid.org/0000-0002-9236-472X"}],"created":"$VAR$","modified":"$VAR"},"usability_domain":["A pipeline for atomizing genomic/transcriptomic data."]}

  const meta = {"object_id": "file:///usr/local/bin/carmst05/pipelines/templates/atomize.json", "spec_version": "https://w3id.org/ieee/ieee-2791-schema/", "eTag": "$VAR$"};
  const descriptionDomain = dummy.description_domain;
  const provenanceDomain = dummy.provenance_domain;
  const usabilityDomain = dummy.usability_domain;
  const executionDomain = dummy.execution_domain;
  const ioDomain = dummy.io_domain;
  const parametricDomain = dummy.parametric_domain;

  return (
    <Container maxWidth={false}>
      <Grid
        className={classes.margined}
        container
        spacing={3}
      >
        <Grid
          item
          lg={7}
          md={12}
          xs={12}
        >
        <Card className={classes.meta} >
          <Meta items={meta} />
        </Card>
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          xs={12}
        >
        <Card className={classes.provenanceDomain} >
          <ProvenanceDomain items={provenanceDomain} />
        </Card>
        </Grid>
        <Grid
          item
          lg={6}
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
        <Grid
          item
          lg={12}
          md={12}
          xs={12}
        >
        <Card className={classes.executionDomain} >
          <ExecutionDomain items={executionDomain} />
        </Card>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xs={12}
        >
        <Card className={classes.ioDomain} >
          <IoDomain items={ioDomain} />
        </Card>
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          xs={12}
        >
        <Card className={classes.parametricDomain} >
          <ParametricDomain items={parametricDomain} />
        </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ColorCoded;

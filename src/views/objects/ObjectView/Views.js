// Source: https://material-ui.com/components/tabs/

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Tab icons
import OpacityIcon from '@material-ui/icons/Opacity';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

// Color-coded view
import ColorCoded from './ColorCoded'

// Tree view
import Tree from './Tree'

// Raw view
import Raw from './Raw'

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
//import { DisplayContext } from '../../../layouts/ObjectViewLayout/index';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '100px'
  },
}));

export default function Views({ table, objectId }) {
  
  console.log('%%%%', table)
  console.log('$$$$', objectId)
  
  const classes = useStyles();

  // Get the ID requested, but first, set the state.
  const [loading, setLoading] = useState(true);
  const [objectFound, setObjectFound] = useState();
  const [objectInfo, setObjectInfo] = useState();

  // Make the request to the API, then pass the
  // result to the children.

  // Source: https://www.bitnative.com/2020/07/06/four-ways-to-fetch-data-in-react/
  // Source: https://stackoverflow.com/questions/60888028/how-to-wait-for-fetch-before-rendering-data-in-functional-component

  // Construct the request.

  // Fetch behavior requires further processing.

  // Source: https://stackoverflow.com/questions/43903767/read-the-body-of-a-fetch-promise
  
  const getObjectInfo = () => {
    
    // Call the API.    
    fetch('http://127.0.0.1:8000/bco/objects/read', {
      method: 'POST',
      body: JSON.stringify({
        POST_read_object: [
            {
                table: table, 
                object_id: objectId
            }
        ]
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    }).then(response=>response.json()).then(data=>{
      
      console.log('+++++++++++++++++', data)
      // Get the bulk response.
      const bulkResponse = data.POST_read_object[0];

      // Was the object found?
      if(bulkResponse.request_code == '200') {
        
        // We found the object, so set the data.
        setObjectInfo(bulkResponse.contents.object);
        setObjectFound(true);

      } else {

        // There was a problem, so show what it was.
        setObjectInfo(bulkResponse.message);
        setObjectFound(false);
  
      }

      // We're no longer loading.
      setLoading(false);

    })

    /*
    fetch('http://34.204.34.42/api/bco/objects/read', {
      method: 'POST',
      body: JSON.stringify({ 
        POST_read_object: [
            {
              table: 'bco_draft', 
              object_id: 'https://34.204.34.42/BCO_DRAFT_18c94000e60e47a48198d99c54ba04b8'
            }
        ]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
        return response.json();
      }).then(data => {
        setObjectInfo(data.POST_read_object.contents);
        setLoading(false);
      });
    */

    // For testing.
    /*setObjectInfo(JSON.parse('{"object_id":"https://portal.aws.biochemistry.gwu.edu/bco/BCO_099545","spec_version":"https://w3id.org/biocompute/1.4.0/","eTag":"347c9361204891c133ee22fef6d0e50191dbb89e82a7b4bfb03d29d0c76b2e44","description_domain":{"keywords":["Safety Assessment","aluminum","infant","vaccine"],"xref":[{"namespace":"pubmed","name":"PubMed","ids":["22001122"],"access_time":"2020-04-21T14:17:21-0400"}],"platform":["RStudio"],"pipeline_steps":[{"step_number":0,"name":"ODE_rates.R","description":"The matrix “dosedat” is maximum aluminum content of vaccines based on 2011 ACIP vaccination schedule. This data was reported in Table 1 (Mitkus et al. 2011). We will also be setting the PK parameters used in the rest of the program, as well as specifying the ordinary differential equations (ODEs) for the 3 compartment model (Mitkus et al 2011). For children the renal elimination constant k10 and bodyweight were modified to reflect contionous maturation. The maturation functions disscussed in Mitkus et al. 2011 was incorporated to the ODEs specified for adult model.","version":"NA","input_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/ODE_rates.R","access_time":"2020-04-20T09:40:17-0500"}],"output_list":[]},{"step_number":1,"name":"ODE_release2.R","description":"Due to the nonlinear nature of the compartmental pharmacokinetic model, the solutions to the ODEs specified above are computed using the “ODE” function from the package “deSolve”, and the results are stored as a list of values for each time period.","version":"NA","input_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/ODE_relaese2.R","access_time":"2020-04-20T09:40:17-0500"}],"output_list":[]},{"step_number":2,"name":"daily_dose.R","description":"The minimal risk values (body burdens) of aluminum for the 5th and 50th percentile of infants body weight was calculated based on the safety threshold set by the Agency for Toxic Substances and Disease Registry (ATSDR). Exposure to aluminum from breastmilk and infant formula are also estimated as detailed in Mitkus et al. 2011. Functions were written to compute the body burden of aluminum following instantaneous (100% absorption) as well as the slow absorption from intramuscular injection of vaccines.","version":"NA","input_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/daily_dose.R","access_time":"2020-04-20T09:40:17-0500"}],"output_list":[]},{"step_number":3,"name":"body_burden.R","description":"Combining all the values and functions that are set above, we finally generate the the values reflecting the body burden (for the 5th and 50th body weight percentile of infants).","version":"NA","input_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/plots.R","access_time":"2020-04-20T09:40:17-0500"}],"output_list":[]},{"step_number":4,"name":"plots.R","description":"Producing the figures.","version":"NA","input_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/plots.R","access_time":"2020-04-20T09:40:17-0500"}],"output_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/Body_burden_v_age_in_days_[Vaccines_(AlOH)].png","access_time":"2020-04-20T09:40:17-0500"},{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/Body_burden_v_age_in_days_[Vaccines_(AlP04)].png","access_time":"2020-04-20T09:40:17-0500"},{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/Body_burden_v_age_in_days_[Vaccines_(Bolus)].png","access_time":"2020-04-20T09:40:17-0500"}]},{"step_number":5,"name":"output_dataset.R","description":"Creating an “output” dataset for export and further analysis if needed. This datset is essentially the data that generated the figures.","version":"NA","input_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/output_datasets.R","access_time":"2020-04-20T09:40:17-0500"}],"output_list":[{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/outputs.csv","access_time":"2020-04-20T09:40:17-0500"}]}]},"error_domain":{"empirical_error":{},"algorithmic_error":{}},"execution_domain":{"script":[{"uri":{"uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model"}}],"script_driver":"R","software_prerequisites":[{"name":"R-3.6.3","version":"3.6.3","uri":{"uri":"https://cran.r-project.org/bin/macosx/R-3.6.3.pkg","access_time":"2020-04-20T09:40:17-0500"}},{"name":"deSolve","version":"1.28","uri":{"uri":"https://cran.r-project.org/src/contrib/deSolve_1.28.tar.gz","access_time":"2020-04-20T09:40:17-0500"}}],"external_data_endpoints":[{"name":"CRAN","url":"https://cran.r-project.org/"},{"name":"PubMed","url":"https://www.ncbi.nlm.nih.gov/pubmed"}],"environment_variables":{"HOSTTYPE":"x86_64-linux","EDITOR":"vim"}},"extension_domain":[{"extension_schema":"https://github.com/biocompute-objects/BCO_Specification/blob/1.4.0/schemas/extension_domain/fhir_extension.json","scm_extension":{"scm_repository":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines","scm_type":"git","scm_commit":"0dc930d9f897f1b581526684f3423482120fa2c7","scm_path":"biocompute-objects/Aluminum-in-infant-vaccines","scm_preview":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/master"}}],"io_domain":{"input_subdomain":[{"uri":{"filename":"ODE_rates.R","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/ODE_rates.R","access_time":"2020-04-20T09:40:17-0500"}},{"uri":{"filename":"ODE_release2.R","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/ODE_release2.R","access_time":"2020-04-20T09:40:17-0500"}},{"uri":{"filename":"daily_dose.R","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/daily_dose.R","access_time":"2020-04-20T09:40:17-0500"}},{"uri":{"filename":"body_burden.R","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/body_burden.R","access_time":"2020-04-20T09:40:17-0500"}},{"uri":{"filename":"plots.R","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/plots.R","access_time":"2020-04-20T09:40:17-0500"}},{"uri":{"filename":"output_dataset.R","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/output_dataset.R","access_time":"2020-04-20T09:40:17-0500"}}],"output_subdomain":[{"mediatype":"text/csv","uri":{"filename":"outputs.csv","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/outputs.csv","access_time":"2017-01-24T09:40:17-0500"}},{"mediatype":"text/csv","uri":{"filename":"Body_burden_v_age_in_days_[Vaccines_(AlOH)].png","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/Body_burden_v_age_in_days_[Vaccines_(AlOH)].png","access_time":"2017-01-24T09:40:17-0500"}},{"mediatype":"text/csv","uri":{"filename":"Body_burden_v_age_in_days_[Vaccines_(AlP04)].png","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/Body_burden_v_age_in_days_[Vaccines_(AlP04)].png","access_time":"2017-01-24T09:40:17-0500"}},{"mediatype":"text/csv","uri":{"filename":"Body_burden_v_age_in_days_[Vaccines_(Bolus)].png","uri":"https://github.com/biocompute-objects/Aluminum-in-infant-vaccines/tree/1.0.0/Aluminum-Exposure-Model/Body_burden_v_age_in_days_[Vaccines_(Bolus)].png","access_time":"2017-01-24T09:40:17-0500"}}]},"provenance_domain":{"embargo":{},"name":"R Safety Assessment Algorithm for Aluminum in Infant Vaccines","version":"1.0.0","review":[{"status":"approved","reviewer_comment":"Approved by GW staff. Waiting for approval from FDA Reviewer","date":"2020-04-21T14:17:21-0400","reviewer":{"name":"Hadley King","email":"hadley_king@gwmail.gwu.edu","affiliation":"George Washington University","contribution":["createdBy"]}},{"status":"in-review","reviewer_comment":"NA","date":"2020-04-21T14:17:21-0400","reviewer":{"name":"Mark Walderhaug","affiliation":"FDA","contribution":["curatedBy"]}}],"derived_from":"NA","obsolete_after":"NA","contributors":[{"name":"Charles Hadley King","affiliation":"George Washington University","email":"hadley_king@gwu.edu","contribution":["createdBy","curatedBy"],"orcid":"https://orcid.org/0000-0003-1409-4549"},{"name":"Mark Walderhaug","affiliation":"U.S. Food and Drug Administration","email":"mark.walderhaug@fda.hhs.gov","contribution":["curatedBy","curatedBy","authoredBy"]},{"name":"RJ Mitkus","affiliation":"U.S. Food and Drug Administration","email":"rj.mitkus@fda.hhs.gov","contribution":["authoredBy"]},{"name":"RJ Mitkus","affiliation":"U.S. Food and Drug Administration","email":"rj.mitkus@fda.hhs.gov","contribution":["authoredBy"]},{"name":"DB King","affiliation":"U.S. Food and Drug Administration","email":"db.king@fda.hhs.gov","contribution":["authoredBy"]},{"name":"MA Hess","affiliation":"U.S. Food and Drug Administration","email":"ma.hess@fda.hhs.gov","contribution":["authoredBy"]}],"license":"https://creativecommons.org/licenses/by/4.0/","created":"2020-04-30T18:03:25.679Z","modified":"2020-04-30T18:03:25.679Z"},"usability_domain":["This algorithm was originally developed at the Center for Biologics Evaluation and Research to assist in safety prediction of aluminum containing infant vaccines.  A full description of the algorithm is published in the journal “vaccine” (Mitkus et al. 2011). The algorithm is capable of creating aluminum pharmacokinetic profiles for infant following recommended vaccination schedule by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention. Also it predicts aluminum safety threshold based on the level set by the Agency for Toxic Substances and Disease Registry."],"parametric_domain":[{"param":"seed","step":"1","value":"random"}]}'));
    setLoading(false);*/
  }
  
  useEffect(() => {
    setLoading(true);
    getObjectInfo();
  }, []);

  // Use the parent context.
  // Source: https://www.digitalocean.com/community/tutorials/react-usecontext

  // As of 1/29/21, there is a problem in React with this function call.
  // Source: https://stackoverflow.com/questions/62564671/using-usecontext-in-react-doesnt-give-me-the-expect-data

  // Pull the state from the parent.
  //const { 
  //  view
  //} = useContext(DisplayContext);

  // Define a variable for switching views within
  // the component (as opposed to getting the value)
  // from the parent).
  const [componentView, setComponentView] = React.useState(0);

  const handleChange = (event, newValue) => {
    setComponentView(newValue);
  };

  // Integers are required for this component,
  // so typecast the value we got from the radio selector.

  // Use value={Number(view)} to pull from the parent..

  return (
    loading
      ?
        <div>
          <Typography>Loading...</Typography>
        </div>
      :
        objectFound
          ?
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={componentView} onChange={handleChange} aria-label="simple tabs example">
                  <Tab icon={<OpacityIcon />} label="Color-Coded" {...a11yProps(0)} />
                  <Tab icon={<AccountTreeIcon />} label="Tree" {...a11yProps(1)} />
                  <Tab icon={<InsertDriveFileIcon />} label="Raw" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              {/* <Typography>
                Object ID: {objectId}
              </Typography> */}
              <TabPanel value={componentView} index={0}>
                <ColorCoded contents={objectInfo} />
              </TabPanel>
              <TabPanel value={componentView} index={1}>
                <Tree contents={objectInfo} />
              </TabPanel>
              <TabPanel value={componentView} index={2}>
                <Raw contents={objectInfo} />
              </TabPanel>
            </div>
          :
          <div className={classes.root}>
            <Typography>
              There was a problem with the request, see output below.
            </Typography>
            <Typography>
              Server http://127.0.0.1 says: {objectInfo}
            </Typography>
          </div>
  );
}
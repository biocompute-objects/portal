// Source: https://material-ui.com/components/tabs/

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Dummy redirecting after draft object creation.
// See https://www.codegrepper.com/code-examples/javascript/useHistory+is+not+exported+form+react-router-dom
import { useNavigate } from 'react-router-dom';

// Tab icons
import OpacityIcon from '@material-ui/icons/Opacity';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

// Color-coded view
import ColorCoded from './ColorCoded'

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

export default function Views({ saving, setSaving, publishing, setPublishing, compCheck, table, objectId }) {
  
  console.log('%%%%%%%%')
  console.log(compCheck)
  console.log(table)
  console.log('typeof(table):', typeof(table))
  console.log(objectId)
  console.log('##########')
  
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
    //fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/create/', {
    fetch('http://127.0.0.1:8000/bco/objects/create/', {
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
  
  const getObjectInfo = () => {
    
    // Call the API.
    //fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/read/', {
    fetch('http://127.0.0.1:8000/bco/objects/read/', {
      
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
      
      console.log('+++++++++++++++++', data);

      // Get the bulk response.
      const bulkResponse = data.POST_read_object[0];

      // Was the object found?
      if(bulkResponse.request_code === '200') {
        
        // We found the object, so set the data.
        setObjectInfo(bulkResponse.content);
        setObjectFound(true);

      } else {

        // There was a problem, so show what it was.
        setObjectInfo(bulkResponse.message);
        setObjectFound(false);
  
      }

      // We're no longer loading.
      setLoading(false);

    })
  }
  
  useEffect(() => {

    // Default to the loading state.
    setLoading(true);

    // Were a table and object ID provided?
    if(typeof(table) === 'undefined' || typeof(objectId) === 'undefined') {

      // We need a new draft object.
      newDraftObject();

    } else {
      
      // Look for the object ID provided.
      getObjectInfo();

    }
    
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
                  <Tab icon={<InsertDriveFileIcon />} label="Raw" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              {/* <Typography>
                Object ID: {objectId}
              </Typography> */}
              <TabPanel value={componentView} index={0}>
                <ColorCoded saving={saving} setSaving={setSaving} publishing={publishing} setPublishing={setPublishing} compCheck={compCheck} contents={objectInfo} />
              </TabPanel>
              <TabPanel value={componentView} index={1}>
                <Raw saving={saving} setSaving={setSaving} publishing={publishing} setPublishing={setPublishing} compCheck={compCheck} contents={objectInfo} />
              </TabPanel>
            </div>
          :
          <div className={classes.root}>
            <rD />
            <Typography>
              There was a problem with the request, see output below.
            </Typography>
            <Typography>
              Server http://127.0.0.1 says: {objectInfo}
            </Typography>
          </div>
  );
}
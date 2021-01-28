// Source: https://material-ui.com/components/tabs/

import React, { useState, useEffect } from 'react';
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

export default function Views(id) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Get the ID requested.

  // Make the request to the API, then pass the
  // result to the children.

  // Source: https://www.bitnative.com/2020/07/06/four-ways-to-fetch-data-in-react/

  const [objectInfo, setObjectInfo] = useState({});

  useEffect(() => {

    // Construct the request.
    /*
    const requestUrl = 'https://127.0.0.1:8000/';
    const requestData = {
      'POST_read_object': [
        {
          'object_id': 'asdfdas',
          'table': 
        }
      ]
    };
    */

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        return response.json();
      })
      .then(json => {
        setObjectInfo(json);
      })
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab icon={<OpacityIcon />} label="Color-Coded" {...a11yProps(0)} />
          <Tab icon={<AccountTreeIcon />} label="Tree" {...a11yProps(1)} />
          <Tab icon={<InsertDriveFileIcon />} label="Raw" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ColorCoded contents={objectInfo} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tree contents={objectInfo} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Raw contents={objectInfo} />
      </TabPanel>
    </div>
  );
}

/*
export default function Views() {

  return (
    <div style={{marginBottom: '100px'}}>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Section View</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorCoded />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Tree View</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Tree />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Raw</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Raw />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
*/

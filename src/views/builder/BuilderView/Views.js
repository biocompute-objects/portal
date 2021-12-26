// src/views/builder/BuilderView/Views.js

// Source: https://material-ui.com/components/tabs/

import React, { useEffect, useState } from 'react';
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
import ColorCoded from './ColorCoded';
import TreeView from './TreeView';
import JsonView from './JsonView';

// Fetch context.
import { FetchContext } from '../../../App';

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
// import { DisplayContext } from '../../../layouts/ObjectViewLayout/index';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

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
          <Typography component="span">{children}</Typography>
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
  loading: {
    marginTop: '100px',
    textAlign: 'center'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '100px'
  },
}));

export default function Views({
  downloadDraft, setDownloadDraft, newDraft, saveDraft, setSaveDraft, publish, setPublish, complianceCheck, objectId, objectContents, setObjectContents, loading, objectFound
}) {
  const classes = useStyles();

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);

  useEffect(() => {
    console.log('objectFound: ', objectFound);
  }, [objectFound]);

  // Define a variable for switching views within
  // the component (as opposed to getting the value)
  // from the parent).
  const [componentView, setComponentView] = useState(0);

  const handleChange = (event, newValue) => {
    setComponentView(newValue);
  };

  return (
    objectFound
      ? (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={componentView} onChange={handleChange} aria-label="simple tabs example">
              <Tab icon={<OpacityIcon />} label="Color-Coded" {...a11yProps(0)} />
              <Tab icon={<AccountTreeIcon />} label="Tree View JSON" {...a11yProps(1)} />
              <Tab icon={<InsertDriveFileIcon />} label="Raw JSON View" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={componentView} index={0}>
            <ColorCoded
              downloadDraft={componentView === 0 ? downloadDraft : null}
              setDownloadDraft={setDownloadDraft}
              saveDraft={saveDraft}
              setSaveDraft={setSaveDraft}
              publish={publish}
              setPublish={setPublish}
              complianceCheck={complianceCheck}
              objectContents={objectContents}
              setObjectContents={setObjectContents}
            />
          </TabPanel>
          <TabPanel value={componentView} index={1}>
            <TreeView
              objectContents={objectContents}
              setObjectContents={setObjectContents}
            />
          </TabPanel>
          <TabPanel value={componentView} index={2}>
            <JsonView
              objectContents={objectContents}
              setObjectContents={setObjectContents}
            />
          </TabPanel>
        </div>
      )
      : (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={componentView} onChange={handleChange} aria-label="simple tabs example">
              <Tab icon={<OpacityIcon />} label="Color-Coded" {...a11yProps(0)} />
              <Tab icon={<InsertDriveFileIcon />} label="Raw" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <Typography>
            Loading......
          </Typography>
          <Typography>
            'We are loading...'
          </Typography>
        </div>
      )
  );
}

// Source: https://material-ui.com/components/tabs/

import React, { useEffect, useState } from 'react';
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
import ColorCoded from './ColorCoded';
import Raw from './Raw';
import Tree from './Tree';

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

export default function Views({ objectId }) {
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
  useEffect(() => {
    const getObjectInfo = () => {
      // Call the API.

      // NO token necessary since published objects
      // are freely requestable by the public.
      fetch(objectId, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res) => res.json().then((data) => ({
        data,
        status: res.status
      })).then((res) => {
        // Did the request go ok or not?
        if (res.status === 200) {
          // We found the object, so set the data.
          localStorage.setItem('bco', JSON.stringify(res.data[0]));
          setObjectInfo(res.data[0]);
          setObjectFound(true);
        } else {
          // There was a problem, so show what it was.
          setObjectInfo();
          setObjectFound(false);
        }

        // We're no longer loading.
        setLoading(false);
      }));
    };

    setLoading(true);
    getObjectInfo();
  }, []);

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
      ? (
        <div>
          <Typography>Loading...</Typography>
        </div>
      )
      : objectFound
        ? (
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={componentView} onChange={handleChange} aria-label="simple tabs example">
                <Tab icon={<OpacityIcon />} label="Color-Coded" {...a11yProps(0)} />
                <Tab icon={<AccountTreeIcon />} label="Tree" {...a11yProps(1)} />
                <Tab icon={<InsertDriveFileIcon />} label="Raw" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
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
        )
        : (
          <div className={classes.root}>
            <Typography>
              There was a problem with the request, see output below.
            </Typography>
            <Typography>
              Server http://127.0.0.1 says:
              {' '}
              {objectInfo}
            </Typography>
          </div>
        )
  );
}

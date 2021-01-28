import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';

// Get the host IP.
// Source: https://stackoverflow.com/questions/57193390/how-to-get-ip-address-of-computer-when-running-react-native-app
//import { NetworkInfo } from "react-native-network-info";

const useStyles = makeStyles(() => ({
  root: {},
  appBar: {
    bottom: 0,
    top: 'auto',
    zIndex: 2600
  },
  bottom: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '32px'
  }
}));

const BottomBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.root, className, classes.appBar)}
      elevation={0}
      position="fixed"
      {...rest}
    >
      <Toolbar className={classes.bottom}>
        {/* <NavBar /> */}
        <Typography>BioCompute Portal Version 1.0.0&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Host: 124.423.31.313</Typography>
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
};

BottomBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default BottomBar;

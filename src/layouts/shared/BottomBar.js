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

// Links
import Link from '@material-ui/core/Link';

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
  },
  bottomLink: {
    color: 'orange'
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
        <Typography>
          BioCompute Portal Version BETA 5.0.0&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Host: 100.25.1.222&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<Link className={classes.bottomLink} href={'https://biocomputeobject.org/contact'} target="_blank">Contact Us</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<Link className={classes.bottomLink} href={'https://github.com/biocompute-objects/portal/issues'} target="_blank">Report issue on GitHub</Link>
        </Typography>
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

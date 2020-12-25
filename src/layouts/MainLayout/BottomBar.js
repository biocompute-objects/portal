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

const useStyles = makeStyles(() => ({
  root: {},
  appBar: {
    bottom: 0,
    top: 'auto',
    zIndex: 2600
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto'
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
      <Toolbar className={classes.centered}>
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

import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  padded: {
    paddingRight: '12px'
  }
}));

const Logo = (props) => {
  
  const classes = useStyles();
  
  return (
    <img
      alt="Logo"
      className={classes.padded}
      src="/static/bco_logo.png"
      {...props}
    />
  );
};

export default Logo;

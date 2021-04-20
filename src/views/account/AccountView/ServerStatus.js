// Source: https://material-ui.com/components/alert/#filled

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  hidden: {
    display: 'none'
  },
  showing: {
    display: 'flex'
  }
}));

export default function ServerStatus({ serverStatus }) {
  
  const classes = useStyles();

  return (
    serverStatus !== ''
      ?
        <div className={classes.root}>
          <Alert className={serverStatus === 'success' ? classes.hidden : classes.showing} variant="filled" severity="error">
            The server was unable to verify your credentials.
          </Alert>
          <Alert className={serverStatus !== 'success' ? classes.hidden : classes.showing} variant="filled" severity="success">
            The server was able to verify your credentials!  Closing dialog...
          </Alert>
        </div>
      :
      null
  );
}

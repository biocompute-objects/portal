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
      ? (
        <div className={classes.root}>
          <Alert className={serverStatus === 'failure' ? classes.showing : classes.hidden} variant="filled" severity="error">
            The server was unable to verify your credentials.
          </Alert>
          <Alert className={serverStatus === 'success' ? classes.showing : classes.hidden} variant="filled" severity="success">
            The server was able to verify your credentials!  Closing dialog...
          </Alert>
          <Alert className={serverStatus === 'already_added' ? classes.showing : classes.hidden} variant="filled" severity="error">
            This server has already been added to your account.  Click 'Set Credentials' if you wish to update your credentials on the server.
          </Alert>
          <Alert className={serverStatus === 'information_fetched' ? classes.showing : classes.hidden} variant="filled" severity="success">
            Server information has been successfully fetched.  Click add server to add this to your profile.
          </Alert>
          <Alert className={serverStatus === 'failure_connect' ? classes.showing : classes.hidden} variant="filled" severity="error">
            Failure to connect to the given server!
          </Alert>
        </div>
      )
      : null
  );
}

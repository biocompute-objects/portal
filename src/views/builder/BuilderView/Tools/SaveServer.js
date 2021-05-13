// Source: https://material-ui.com/components/selects/#simple-select

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

// Servers, hostnames, and groups.
import ServersHostnamesGroups from './ServersHostnamesGroups';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: '0',
    marginRight: '0',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export default function SaveServer({ savingFunction }) {

  // Saving is only possible if a user is logged in
  // and has access to a server.

  // State
  const [loggedInWithServers, setLoggedInWithServers] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {

    // Logged in and has servers?
    const userInfoCheck = JSON.parse(localStorage.getItem('user'));

    if(userInfoCheck !== null) {
      if(userInfoCheck.apiinfo.length > 0) {
        setLoggedInWithServers(true);
        setUserInfo(userInfoCheck);
      }
    }

  }, [])

  return (
    loggedInWithServers
          ?
            <ServersHostnamesGroups items = { userInfo.apiinfo } savingFunction = { savingFunction } />
          :
            <Typography>You must be logged in to save or publish drafts.</Typography>
  );
}

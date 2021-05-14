// Source: https://material-ui.com/components/selects/#simple-select

import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

// Servers, hostnames, and groups.
import ServersHostnamesGroups from './ServersHostnamesGroups';

export default function SaveServer({ savingLocation, serverLock, setSaveTo }) {

  // Saving is only possible if a user is logged in
  // and has access to a server.

  // State
  const [loggedInWithServers, setLoggedInWithServers] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

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
            <ServersHostnamesGroups items = { userInfo.apiinfo } savingLocation = { savingLocation } serverLock = { serverLock } setSaveTo = { setSaveTo } />
          :
            <Typography>You must be logged in to save or publish drafts.</Typography>
  );
}

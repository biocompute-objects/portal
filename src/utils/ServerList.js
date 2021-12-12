// Source: https://material-ui.com/components/autocomplete/#combo-box

/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';

export default function ServerList({
  disabledValue, options, receivedDefault, setter, type
}) {
  // Some quick processing to make the keys usable.
  const processed = [];
  // Render the options for servers based on the type of server
  // list we have IF we have them.
  if (options !== null) {
    options.forEach((item) => {
      const groupList = [];
      const userList = [];
      const userName = item.username;
      Object.keys(item.other_info.permissions.groups).forEach((subitem) => {
        if (item.other_info.permissions.groups) {
          groupList.push(subitem);
        }
      });
      Object.keys(item.other_info.permissions.user).forEach((subitem) => {
        if (item.other_info.permissions.user) {
          userList.push(subitem);
        }
      });
      processed.push({
        hostname: item.public_hostname,
        human_readable_hostname: item.human_readable_hostname,
        group: groupList,
        userlist: userList,
        username: userName
      });
    });
  }

  // Trouble with inputValue, so split the logic.
  return (
    receivedDefault !== null
      ? (
        <Autocomplete
          disabled={disabledValue}
          fullWidth
          inputValue={receivedDefault}
          onChange={(event, newValue) => {
            newValue === null
              ? setter('')
              : setter(newValue.hostname);
          }}
          options={processed}
          getOptionLabel={(option) => `${option.hostname} - ${option.human_readable_hostname}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label={type === 'draft'
                ? 'Select server to save draft to.'
                : 'Select server to publish draft to.'}
            />
          )}
        />
      )
      : (
        <Autocomplete
          disabled={disabledValue}
          fullWidth
          onChange={(event, newValue) => {
            newValue === null
              ? setter('')
              : setter(`${newValue.hostname} - ${newValue.group}`);
          }}
          options={processed}
          getOptionLabel={(option) => `${option.hostname} - ${option.human_readable_hostname} (${option.group})`}
          renderInput={(params) => (
            <TextField
              {...params}
              label={type === 'draft'
                ? 'Select BCODB to save draft to.'
                : 'Select BCODB to publish draft to.'}
            />
          )}
        />
      )
  );
}

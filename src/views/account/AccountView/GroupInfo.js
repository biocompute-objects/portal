// src/views/account/AccountView/GroupInfo.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Grid, Container
} from '@material-ui/core';
import ListBoxStatic from 'src/components/ListBoxStatic';

export default function GroupInfo() {
  const ApiList = JSON.parse(localStorage.getItem('user')).apiinfo;
  const holder = [];
  ApiList.forEach((perm) => {
    if (perm.other_info.permissions.groups.bco_drafter) {
      const group_holder = [];
      const user_holder = [];
      Object.keys(perm.other_info.permissions.groups).map((group, index) => (
        group_holder.push(group)
      ));
      Object.keys(perm.other_info.permissions.user).map((user, index) => (
        Object.keys(user[index]).map((thing, index) => (
          user_holder.push(perm.other_info.permissions.user[user][index])
        ))
      ));
      holder.push(
        { user: user_holder, groups: group_holder }
      );
    } else {
      holder.push(perm.other_info.permissions);
    }
  });
  console.log(holder);
  return (
    <Container>
      <Grid container spacing={2}>
        {holder.map((perm) => (
          <Card variant="outlined">
            <ListBoxStatic
              header="Permissions"
              list={perm.user}
            />
            <ListBoxStatic
              header="Groups"
              list={perm.groups}
            />
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

GroupInfo.propTypes = {
};

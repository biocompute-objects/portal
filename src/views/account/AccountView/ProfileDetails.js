// src/views/account/AccountView/ProfileDetails.js

import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  
  const classes = useStyles();
  
  var userInfo = JSON.parse(localStorage.getItem('user'));
  console.log(userInfo)

  return (
      <Card elevation={0}>
        <CardContent>


  <Avatar className={classes.avatar} src={userInfo.avatar} />


  <Grid item xs container direction="column" spacing={2}>
    <Grid item xs>
      <Typography gutterBottom variant="h2">
        { userInfo.username }
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        Name: { userInfo.firstnNme } { userInfo.lastName }
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        Affiliation: {userInfo.profile.affiliation}
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        Email: {userInfo.email}
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        ORCID: {userInfo.profile.orcid}
      </Typography>
    </Grid>

</Grid>
        </CardContent>
      </Card>

  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

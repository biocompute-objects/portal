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



  
  const [values, setValues] = useState({
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    email: userInfo.email,
    alt_email: userInfo.apiinfo[0].alt_email,
    affiliation: userInfo.apiinfo[0].affiliation,
    orcid: userInfo.apiinfo[0].orcid
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
        Name: { userInfo.first_name } { userInfo.last_name }
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        Affiliation: {userInfo.apiinfo[0].affiliation}
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        Email: {userInfo.email}
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        Alternative Email: {userInfo.apiinfo[0].alt_email}
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        ORCID: {userInfo.apiinfo[0].orcid}
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

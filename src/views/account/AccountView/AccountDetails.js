// src/views/account/AccountView/AccountDetails.js

import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = ({ className, ...rest }) => {
  var userInfo = JSON.parse(localStorage.getItem('user'))	
  console.log(userInfo)
  const classes = useStyles();
  
  const [values, setValues] = useState({
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    email: userInfo.email,
    alt_email: userInfo.alt_email,
    apiinfo: userInfo.apiinfo,
    groups: userInfo.groups,
    password: userInfo.password,
    username: userInfo.username,
    profile: {
        affiliation: userInfo.affiliation,
        orcid: userInfo.orcid,
		public: userInfo.public
    	
    }
  });
	// pass state to local storage for safe keeping
  useEffect(() => {
	  localStorage.setItem('user', JSON.stringify(values))
  })
	// Handler for form entery. 
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  };
console.log(values)
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      >
      <Card elevation={0}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                fullWidth
                label="Profile Picture TODO"
                name="avatar"
                onChange={handleChange}
                type="image"
                value={values.avatar}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                fullWidth
                label="Affiliation"
                name="affiliation"
                onChange={handleChange}
                required
                value={values.affiliation}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                fullWidth
                label="ORCID"
                name="orcid"
                onChange={handleChange}
                required
                value={values.orcid}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box
          display="flex"
          justifyContent="center"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;

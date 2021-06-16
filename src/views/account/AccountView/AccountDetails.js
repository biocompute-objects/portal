


// src/views/account/AccountView/AccountDetails.js

import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { FetchContext } from '../../../App';
import { Formik } from 'formik';
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
  var retrieveUser = localStorage.getItem('user');
  var userInfo = JSON.parse(retrieveUser);
  const classes = useStyles();
  const navigate = useNavigate();
  const [apikey, setApikey] = useState();

  // Fetch context.
  const fc = useContext(FetchContext);
  
  const [values, setValues] = useState({
    firstName: userInfo.first_name || "",
    lastName: userInfo.last_name || "",
    email: userInfo.email || "",
    alt_email: userInfo.apiinfo[0].other_info.alt_email || "",
    affiliation: userInfo.apiinfo[0].other_info.affiliation || "",
    orcid: userInfo.apiinfo[0].other_info.orcid || "",
    username: userInfo.username || "",
    token: localStorage.getItem('token')
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (


    <Formik
      initialValues={{
          firstName: values.firstName || "",
          username: values.username || "",
          lastName: values.lastName || "",
          email: values.email || "",
          alt_email: values.alt_email || "",
          affiliation: values.affiliation || "",
          orcid: values.orcid || "",
          token: values.token
          }}
      onSubmit= {(values) => {
    
            fetch(fc['sending']['userdb_update_user'], {
                method: 'POST',
                headers: {
                  Authorization: `JWT ${localStorage.getItem('token')}`,
                  "Content-type": "application/json; charset=UTF-8"
                },

                body: JSON.stringify({
                  api_key: apikey,
                  "username": values.username, 
                  "email": values.email,
                  "alt_email": values.alt_email,
                  "first_name": values.firstName,
                  "last_name": values.lastName,
                  "affiliation": values.affiliation,
                  "orcid": values.orcid,
                  'token': values.token

                })
              })
              .then(res => res.json()).then(json => {

                if(typeof(json.user) !== 'undefined') {
                
                  localStorage.setItem('token', json.token);
                  localStorage.setItem('user', JSON.stringify(json.user));
                  window.location.reload();
                } else {
              
                    console.log('Error')
                    navigate('/account', { replace: true });
                  }
                })
      }}

     
    >
    {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
    <form onSubmit={handleSubmit}>
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
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="Alt Email"
                name="alt_email"
                onChange={handleChange}
                value={values.alt_email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="Affiliation"
                name="affiliation"
                onChange={handleChange}
                value={values.affiliation}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="ORCID"
                name="orcid"
                onChange={handleChange}
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
            type="submit"
            value="Submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
      </form>
    )}
    </Formik>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;

// src/views/account/AccountView/Profile.js

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

import { FetchContext } from '../../../App';
import UserdbUpdateAccount from '../../../components/API/UserdbUpdateAccount.js';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 125,
    width: 125
  },
  detailDropdown: {
    fontSize: '20px'
  }
}));

const userInfo = JSON.parse(localStorage.getItem('user'));

const Profile = ({ className, ...rest }) => {
  const fc = useContext(FetchContext);
  const classes = useStyles();
  let userProfile = userInfo.profile;

  // const [isPublic, setIsPublic] = useState(false);
  let publicSetting = false;
  const [isPublic, setIsPublic] = useState(publicSetting);

  if (userProfile === undefined || userProfile === null) {
    console.log('userInfo.profile === null');
    userProfile = ({
      affiliation: '',
      orcid: '',
      public: false,
    });
  } else if ('public' in userInfo.profile) {
    publicSetting = userInfo.profile.public;
  }

  const [values, setValues] = useState({
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    email: userInfo.email,
    alt_email: userInfo.alt_email,
    apiinfo: userInfo.apiinfo,
    groups: userInfo.groups,
    password: userInfo.password,
    username: userInfo.username,
    affiliation: userProfile.affiliation,
    orcid: userProfile.orcid,
    public: isPublic,
    userurl: fc.sending.update_user,
  });
  const handleChange = (event) => {
    let tar = null;
    if (event.target.type === 'checkbox') {
      tar = event.target.checked;
    } else {
      tar = event.target.value;
    }

    if (event.target.name === 'public') {
      setIsPublic(event.target.checked);
      userInfo.profile.public = event.target.checked;
    }

    setValues({
      ...values,
      [event.target.name]: tar
    });
    localStorage.setItem('user', JSON.stringify({
      username: userInfo.username,
      password: userInfo.password,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      profile: {
        username: userInfo.username,
        public: values.public,
        affiliation: values.affiliation,
        orcid: values.orcid,
      },
      groups: userInfo.groups,
      apiinfo: userInfo.apiinfo,
    }));
  };

  const handleSubmit = (event) => {
    UserdbUpdateAccount(values);
    event.preventDefault();
  };

  return (

    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={4} lg={4} xl={4}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h2">
                  { values.username }
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Name:
                  {' '}
                  { values.first_name }
                  {' '}
                  { values.last_name }
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Affiliation:
                  {' '}
                  {values.affiliation}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Email:
                  {' '}
                  {values.email}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  ORCID:
                  {' '}
                  {values.orcid}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} lg={8} xl={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <Typography className={classes.detailDropdown}>Account Details</Typography>
                <form
                  form
                  onSubmit={handleSubmit}
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
                          name="first_name"
                          onChange={handleChange}
                          required
                          value={values.first_name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={6}>
                        <TextField
                          fullWidth
                          label="Last name"
                          name="last_name"
                          onChange={handleChange}
                          required
                          value={values.last_name}
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
                        <label>
                          Public:
                          <input
                            name="public"
                            type="checkbox"
                            checked={isPublic}
                            // onChange={(event) => setIsPublic(target.checked)}
                            onChange={handleChange}
                          />
                        </label>
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
                      type="submit"
                      variant="contained"
                    >
                      Save details
                    </Button>
                    </Box>
                  </Card>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;

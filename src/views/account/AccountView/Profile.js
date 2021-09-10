// src/views/account/AccountView/Profile.js

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';


// Account details
import AccountDetails from './AccountDetails';

import ProfileDetails from './ProfileDetails';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const Profile = ({ className, ...rest }) => {
  
  const classes = useStyles();

  return (

  <Card className={clsx(classes.root, className)} {...rest}>
    <CardContent>
      <Grid container >
        <Grid item xs={12} sm={4} lg={4} xl={4}>
         <ProfileDetails />
        </Grid>
        <Grid item xs={12} sm={8} lg={8} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography className={classes.detailDropdown}>Account Details</Typography>
                <AccountDetails />
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

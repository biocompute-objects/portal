// src/views/account/AccountView/Profile.js

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

// Layout
import Grid from '@material-ui/core/Grid';

// Account details
import ProfileDetails from './ProfileDetails';

// User Groups
import GroupInfo from './GroupInfo'

// For expanding user account and group details
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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
  
  var userInfo = JSON.parse(localStorage.getItem('user'));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
      <Grid container spacing={2}>
          <Grid item lg={1}>
          {/* <Avatar
            className={classes.avatar}
            src={userInfo.avatar}
          /> */}
          </Grid>
          <Grid item xs={12} lg={3} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h2">
                  { userInfo.username }
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Name: { userInfo.first_name } { userInfo.last_name }
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Affiliation: {userInfo.affiliation}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Email: {userInfo.email}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  ORCID: {userInfo.orcid}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={8}
            md={5}
            xs={5}
          >
            <Grid container spacing={2}>
            <Grid
              item
              lg={12}
              md={5}
              xs={5}
            >
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.detailDropdown}>Account Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ProfileDetails />
                </AccordionDetails>
            </Accordion>
            </Grid>
            <Grid
              item
              lg={12}
              md={5}
              xs={5}
            >
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.detailDropdown}>Groups</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GroupInfo />
                </AccordionDetails>
            </Accordion>
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

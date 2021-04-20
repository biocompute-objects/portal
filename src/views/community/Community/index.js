// src/views/community/Community/index.js

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ReactMarkdown from "react-markdown"; 
import Typography from '@material-ui/core/Typography';

import TechnicalSteeringCommittee from "./TechnicalSteeringCommittee"
import Leadership from './Leadership'
import Organization from "./Organization"
import Services from "./Services"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  marginTopped: {
    marginTop: '50px'
  },
  whiteBackground: {
    backgroundColor: '#ffffff'
  }
}));

function Community() {
  const classes = useStyles();
  
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={3}>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <Leadership />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TechnicalSteeringCommittee />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <Services />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <Organization />
        </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Community;

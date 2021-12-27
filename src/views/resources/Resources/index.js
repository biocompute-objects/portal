// src/views/resources/Resources/index.js

// import React, { useState, useEffect } from 'react';
import React from 'react';
import {
  // Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Typography from '@material-ui/core/Typography';

import Registry from './Registry.js';
import CGC from './CGC.js';
import Packages from './Packages';
import Builder from './Builder';
import Galaxy from './Galaxy';
import Hive from './Hive';
import Citations from './Citations';

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

function DocView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Resources">
      <Container maxWidth={false}>
        <Grid container justify="space-around" spacing={3}>

          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <Registry />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <CGC />
          </Grid>

          <Grid classes={classes.colored} container justify="space-around" spacing={3}>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Hive />
            </Grid>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Packages />
            </Grid>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Builder />
            </Grid>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Galaxy />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Citations />
            </Grid>

          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}

export default DocView;

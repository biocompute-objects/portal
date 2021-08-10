// src/views/community/Community/index.js

import React from 'react';
import {
  Container, Grid, makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TechnicalSteeringCommittee from './TechnicalSteeringCommittee';
import Leadership from './Leadership';
import Organization from './Organization';
import Services from './Services';

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
        <Grid container justify="center" spacing={3}>
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
}

export default Community;

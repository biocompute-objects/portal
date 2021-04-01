// src/views/home/HomeView/index.js

import React, { useState} from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BcoDbViewer from './BcoDbViewer'
import Specification from './Specification'
import MyProfile from './MyProfile'
import BioComputeResources from './BioComputeResources'
import Hive from './Hive'
import Media from './Media'
import NewsBar from './NewsBar'
import Galaxy from './Galaxy'

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

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={3}>
          <Grid item xs={12} sm={8} lg={9} xl={10}>
            <Container maxWidth={false}>
              <Grid container justify='center' spacing={3}>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Media />
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Specification />
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <MyProfile />
                </Grid>
              </Grid>
            </Container>
            <Container className={classes.marginTopped} maxWidth={false}>
              <Box className={classes.whiteBackground}>
                <Grid classes={classes.colored} container justify='space-around' spacing={3}>
                  <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <BioComputeResources />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <Hive />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <BcoDbViewer />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <Galaxy />
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={0} sm={4} lg={3} xl={2} >
            <NewsBar />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default HomeView;

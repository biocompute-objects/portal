// src/views/home/HomeView/index.js

import React from 'react';
import {
  Box, Container, Grid, makeStyles, Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Builder from './Builder';
import Specification from './Specification';
import About from './About';
import BioComputeResources from './BioComputeResources';
import Hive from './Hive';
import BcoDb from './BcoDb';
import FdaBox from './FdaBox'
import NewsBar from './NewsBar';
import Galaxy from './Galaxy';

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
    <Page className={classes.root} title="BioCompute Home">
      <Container maxWidth={false}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} sm={8} lg={9} xl={10}>
          <Container className={classes.marginTopped} maxWidth={false}>
              <Box className={classes.whiteBackground}>
                <Grid classes={classes.colored} container justifyContent="space-around" spacing={3}>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <BcoDb />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <Builder />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <About />
                  </Grid>
                  <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <BioComputeResources />
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth={false}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <Hive />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <Specification />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <Galaxy />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={false} sm={4} lg={3} xl={2}>
            <Box className={classes.whiteBackground}>
              <Typography align="center" variant={"h3"}>
                News and Events
              </Typography>
              <FdaBox />
              <NewsBar />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default HomeView;

// src/views/documentation/DocView.js

import React, { useState} from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

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

const DocView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
    <Container maxWidth={false}>
	  <Grid container justify='center' spacing={3}>
	  <Grid item lg={12} sm={8} xl={8} xs={12}>
        <Container maxWidth={false}>
          <Grid container justify='center' spacing={3}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
hello world
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>

            </Grid>
	  <Grid item lg={4} sm={6} xl={4} xs={12}>

	  </Grid>
          </Grid>
        </Container>
        <Container className={classes.marginTopped} maxWidth={false}>
          <Box className={classes.whiteBackground}>
            <Grid classes={classes.colored} container justify='center' spacing={3}>
              <Grid item lg={12} sm={12} xl={12} xs={12}>

              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>

              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>

              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>

              </Grid>
            </Grid>
          </Box>
        </Container>
        </Grid>
      </Grid>
    </Container>
  </Page>
  );
};

export default DocView;

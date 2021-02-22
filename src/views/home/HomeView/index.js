import React, { useState} from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BcoDbViewer from './BcoDbViewer'
import BcoBuilder from './BcoBuilder'
import MyProfile from './MyProfile'
import SupportingMaterials from './SupportingMaterials'
import Technical from './Technical'
import Media from './Media'
import Other from './Other'

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
	  <Grid item lg={8} sm={6} xl={8} xs={12}>
        <Container maxWidth={false}>
          <Grid container justify='center' spacing={3}>
            <Grid item lg={4} sm={6} xl={4} xs={12}><BcoDbViewer /></Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}><BcoBuilder /></Grid>
	  <Grid item lg={4} sm={6} xl={4} xs={12}><MyProfile /></Grid>
          </Grid>
        </Container>
        <Container className={classes.marginTopped} maxWidth={false}>
          <Box className={classes.whiteBackground}>
            <Grid classes={classes.colored} container justify='center' spacing={3}>
              <Grid item lg={12} sm={12} xl={12} xs={12}><SupportingMaterials /></Grid>
			  <Grid item lg={3} sm={6} xl={3} xs={12}><Technical /></Grid>
			  <Grid item lg={3} sm={6} xl={3} xs={12}><Media /></Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}><Other /></Grid>
            </Grid>
          </Box>
        </Container>
        </Grid>
      </Grid>
    </Container>
  </Page>
  );
};

export default HomeView;

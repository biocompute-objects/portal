import React from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

// BCO DB Viewer
import BcoDbViewer from './BcoDbViewer'

// BCO Builder
import BcoBuilder from './BcoBuilder'

// My Profile
import MyProfile from './MyProfile'

// Supporting Materials
import SupportingMaterials from './SupportingMaterials'

// Technical
import Technical from './Technical'

// Media
import Media from './Media'

// Other
import Other from './Other'

// News
import News from './News'



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

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
              container
              justify='center'
              spacing={3}
            >
            {/* <Grid 
              item
              lg={2}
              sm={6}
              xl={2}
              xs={12}
            >
              <BcoDbViewer />
            </Grid>*/}
            <Grid
              item
              lg={8}
              sm={6}
              xl={8}
              xs={12}
            >
        <Container maxWidth={false}>
          <Grid
            container
            justify='center'
            spacing={3}
          >
            <Grid
              item
              lg={4}
              sm={6}
              xl={4}
              xs={12}
            >
              <BcoDbViewer />
            </Grid>
            <Grid
              item
              lg={4}
              sm={6}
              xl={4}
              xs={12}
            >
              <BcoBuilder />
            </Grid>
            <Grid
              item
              lg={4}
              sm={6}
              xl={4}
              xs={12}
            >
              <MyProfile />
            </Grid>
          </Grid>
          </Container>
          <Container className={classes.marginTopped} maxWidth={false}>
            <Box className={classes.whiteBackground}>
              <Grid
                classes={classes.colored}
                container
                justify='center'
                spacing={3}
              >
                <Grid
                  item
                  lg={12}
                  sm={12}
                  xl={12}
                  xs={12}
                >
                  <SupportingMaterials />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Technical />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Media />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Other />
                </Grid>
              </Grid>
            </Box>
        </Container>
        </Grid>
        {/*
        <Grid
              item
              lg={2}
              sm={6}
              xl={2}
              xs={12}
            >
              <News />
        </Grid>*/}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

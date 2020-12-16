import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ServerInfo from './ServerInfo';
import ProfileDetails from './ProfileDetails';
import AddServer from './AddServer'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

// Set the context.
// Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
export const ParentContext = React.createContext();

const Account = () => {
  const classes = useStyles();

  // State for the add server dialog.
  const [showing, setShowing] = React.useState(false);

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <ParentContext.Provider value={{ showing, setShowing }}>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={4}
            xs={4}
          >
            <Profile />
            <ProfileDetails />
            
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            xs={8}
          >
            <ServerInfo />
          </Grid>
        </Grid>
      </Container>
      <AddServer />
      </ParentContext.Provider>
    </Page>
  );
};

export default Account;

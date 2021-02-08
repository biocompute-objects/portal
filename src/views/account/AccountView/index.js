import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ServerInfo from './ServerInfo';
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

  // State for the add server and group dialogs.
  const [showing, setShowing] = React.useState(false);
  const [groupShowing, setGroupShowing] = React.useState(false);

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <ParentContext.Provider value={{ showing, setShowing, groupShowing, setGroupShowing }}>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={5}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <Profile />           
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={5}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
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

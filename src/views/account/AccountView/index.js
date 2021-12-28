// src/views/account/AccountView/index.js

import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Page from 'src/components/Page';
import AddServer from './AddServer';
import Profile from './Profile';
import ServerInfo from './ServerInfo';
import Password from './Password';

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

const AccountView = () => {
  const classes = useStyles();

  // State for the add server and group dialogs.
  const [showing, setShowing] = React.useState(false);
  const [groupShowing, setGroupShowing] = React.useState(false);

  // State for an added server.
  const [serverAdded, setServerAdded] = React.useState(false);

  // On page load, load the user's information.
  useEffect(() => {
    // "Fake" that a server has been added.
    setServerAdded(true);
  }, []);

  return (
    <Page className={classes.root} title="Account">
      <ParentContext.Provider value={{
        showing, setShowing, groupShowing, setGroupShowing, serverAdded, setServerAdded
      }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Profile />
            </Grid>
          </Grid>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading} variant="h3">
                Change Password (click to expand)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Password />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Container>
        <Container maxWidth={false}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <AddServer />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth={false}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <ServerInfo />
            </Grid>
          </Grid>
        </Container>
      </ParentContext.Provider>
    </Page>
  );
};

export default AccountView;

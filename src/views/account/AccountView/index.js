// src/views/account/AccountView/index.js

import React, { useState } from 'react';
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
import ServerInfo from 'src/views/account/AccountView/ServerInfo';
import Profile from 'src/views/account/AccountView/Profile';
import Password from 'src/views/account/AccountView/Password';
import AddServer from 'src/views/account/AccountView/AddServer';
import AddGroup from 'src/views/account/AccountView/AddGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(12),
    paddingTop: theme.spacing(3)
  },
  pos: {
    marginBottom: 12,
  },
}));

const AccountView = () => {
  const classes = useStyles();
  const [server, setServer] = useState(false);
  //   const [serverAdded, setServerAdded] = useState(false);

  return (
    <Page className={classes.root} title="Account">
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading} variant="h3">
              Server Information (click to expand)
            </Typography>
          </AccordionSummary>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <ServerInfo
                setServer={setServer}
                addGroup={addGroup}
                setAddGroup={setAddGroup}
                setUrl={setUrl}
                url={url}
                setSubmitToken={setSubmitToken}
                submitToken={submitToken}
              />
              <AddServer
                server={server}
                setServer={setServer}
              />
              <AddGroup
                addGroup={addGroup}
                setAddGroup={setAddGroup}
                url={url}
                submitToken={submitToken}
              />
            </Grid>
          </Grid>
        </Accordion>
      </Container>
    </Page>
  );
};

export default AccountView;

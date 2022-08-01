// src/views/account/AccountView/index.js

import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
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

import ModifyGroup from 'src/views/account/AccountView/ModifyGroup';

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
  const [addGroup, setAddGroup] = useState(false);
  const [url, setUrl] = useState();
  const [submitToken, setSubmitToken] = useState();
  const [modifyGroup, setModifyGroup] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    name: 'group.name',
    permissions: ['group_permissions'],
    members: ['group_members'],
    description: '',
    admin: false,
  });

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
              Database, Groups, and Permissions (click to expand)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <Grid item>
                  Each BCO DB instance has an independant set of groups,
                  prefix, and user permissions.
                  <br />
                  To add a new database instance click the &apos;ADD SERVER&apos; button.
                  <br />
                  To create or modify a group expand the &apos;Group&apos;
                  tab in the appropriate server box.
                  {' '}
                </Grid>
                <br />
                <Button
                  color="primary"
                  onClick={() => setServer(true)}
                  variant="contained"
                >
                  Add Server
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <ServerInfo
                  setServer={setServer}
                  setAddGroup={setAddGroup}
                  setModifyGroup={setModifyGroup}
                  setUrl={setUrl}
                  url={url}
                  setGroupInfo={setGroupInfo}
                  setSubmitToken={setSubmitToken}
                  submitToken={submitToken}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
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
        <ModifyGroup
          modifyGroup={modifyGroup}
          setModifyGroup={setModifyGroup}
          url={url}
          submitToken={submitToken}
          groupInfo={groupInfo}
        />
      </Container>
    </Page>
  );
};

export default AccountView;

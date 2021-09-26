// src/components/PermissionTools.js

import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import RetrieveDraftObject from './API/RetrieveDraftObject.js';
import ModifyDraftObject from './API/ModifyDraftObject.js';
import RetrieveDraftObjectPermissions from './API/RetrieveDraftObjectPermissions.js';
import RetrieveObjectsFromToken from './API/RetrieveObjectsFromToken';
import UserdbTokenAuth from './API/UserdbTokenAuth.js';
// Sharing object
import Sharing from '../utils/Sharing';

// Servers
import ServerList from '../utils/ServerList';
import { FetchContext } from '../App';

// Confirm publishing
import PublishDialog from '../utils/PublishDialog';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798

const useStyles = makeStyles((theme) => ({
  centered: {
    textAlign: 'center'
  },
  root: {
    width: '100%',
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}));

const objectId = 'http://127.0.0.1:8000/BCO_DRAFT_111111'


export default function PermissionTools({
  objectIdDerivatives, setDraftSavingLocation, setPublishSavingLocation, setDownloadDraft, setSaveDraft, setPublish, publishedObjectId, publishMessage, receivedDefault, serverLock, setDeleteDraftPostPublish
}) {

  // State
  const [saveDraftTo, setSaveDraftTo] = useState('');
  const [savePublishTo, setSavePublishTo] = useState('');
  const fc = useContext(FetchContext);
  
  // For publishing
  const [open, setOpen] = useState(false);
  const [retainDraft, setRetainDraft] = useState(false);

  // Is the user logged in?
  const [loggedInWithServers, setLoggedInWithServers] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  const classes = useStyles();
  
  let ApiInfo = JSON.parse(localStorage.getItem('user'));
  if (ApiInfo === null) {

    // Use the anon token, which is publicly available.
    ApiInfo = fc.sending.anon_api_info;
	console.log("fc.sending.anon_api_info", fc.sending.anon_api_info)

  } else {

    // There was a user.
    ApiInfo = ApiInfo.apiinfo;

  }
  const mySwitch = 'no'
  // Hook to pull a draft BCO if one does not exist in the local storage.
  useEffect(() => {
  	  if (!localStorage.user) {
		  const tokenAuth = {
			  url: fc.sending.userdb_tokenauth,
			  username: 'hadleyking',
			  password: 'Charles4'
		  }
  		  UserdbTokenAuth( tokenAuth )
  	  }
  })
  useEffect(() => {
	  if (mySwitch === 'yes') {
		  // ModifyDraftObject( objectId )
		  // RetrieveDraftObjectPermissions( objectId )
		  ApiInfo.forEach((item) => {
		    RetrieveObjectsFromToken( item );
		  });
	  }
  }, []);
  
  
  // Define the actions for each click.
  const clickActions = (which) => {
    if (which === 'saveDraft') {
      // From parent.
      setSaveDraft(1);
    } else if (which === 'publishDraft') {
      // From parent.
      setOpen(true);
    } else if (which === 'downloadDraft') {
      // From parent.
      setDownloadDraft(1);
    } else if (which === 'deleteDraft') {

      // From parent.

      // setDeletingDraft(true);

    }
  };

  // ----- LISTENERS ----- //

  // Listen for a change in save location
  // to change the server lock.
  // useEffect(() => {
  //   // UN-parse the saving location information.
  //   // The saving location information has to
  //   // be a string for the selects to not complain.
  //
  //   // Prevent assignment on first render...
  //   // TODO: better way to do this?
  //   if (saveDraftTo !== '') {
  //     setDraftSavingLocation(
  //
  //       {
  //         hostname: saveDraftTo.split(' - ')[0],
  //         group: saveDraftTo.split(' - ')[1]
  //       }
  //
  //     );
  //   }
  // }, [saveDraftTo, setDraftSavingLocation]);

  // Re-direct after publishing.
  // Source: https://stackoverflow.com/a/58536772/5029459
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect === true) {
      // Crappy but works.
      // Source: https://stackoverflow.com/a/64928405/5029459
      window.location.href = publishedObjectId;
    }
  }, [redirect]);

  // ----- INITIAL RENDER ----- //

  // Saving is only possible if a user is logged in
  // and has access to a server.
  useEffect(() => {
    // Logged in and has servers?
    const userInfoCheck = JSON.parse(localStorage.getItem('user'));
    console.log('userInfoCheck: ', userInfoCheck);

    if (userInfoCheck !== null) {
      if (userInfoCheck.apiinfo.length > 0) {
        setLoggedInWithServers(true);
        setUserInfo(userInfoCheck);
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant="h2">Draft Sharing and Publishing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={12}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h1">
                    Group Sharing
                  </Typography>
                  {/*
                objectIdDerivatives['rawName'] !== ""
                  ?
                    <Sharing objectIdDerivatives = { objectIdDerivatives } />
                  :
                    <Typography variant = 'h3'>
                      Please select a server to save your draft to in order to 
					  set permissions for the draft.
                    </Typography>
              */}
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              lg={4}
              md={12}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h1">
                    Saving and Publishing
                  </Typography>
                  {/* <SaveServer
                  savingLocation = { savingLocation }
                      serverLock = { serverLock }
                      setObjectId = { setObjectId }
                      setSaveTo = { setSaveTo }
                      type = { 'draft' }
                    /> */}
                  <ServerList
                    disabledValue={serverLock}
                    options={userInfo === null ? null : userInfo.apiinfo}
                    receivedDefault={receivedDefault}
                    setter={setSaveDraftTo}
                    type="draft"
                  />
                  <Typography>
                &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    disabled={!!(saveDraftTo === '' & receivedDefault === null)}
                    fullWidth
                    onClick={() => clickActions('saveDraft')}
                  >
                    SAVE DRAFT
                  </Button>
                  <Typography>
                    &nbsp;
                  </Typography>
                  <ServerList
                    disabledValue={!serverLock}
                    options={userInfo === null ? null : userInfo.apiinfo}
                    setter={setSavePublishTo}
                    type="publish"
                  />
                  <Typography>
                &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={savePublishTo === ''}
                    fullWidth
                    onClick={() => clickActions('publishDraft')}
                  >
                    PUBLISH DRAFT
                  </Button>

                  <Typography>
                &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    onClick={() => clickActions('downloadDraft')}
                  >
                    DOWNLOAD DRAFT
                  </Button>
                  <Typography>
                &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    disabled={!serverLock}
                    fullWidth
                    onClick={() => clickActions('deleteDraft')}
                  >
                    DELETE DRAFT
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

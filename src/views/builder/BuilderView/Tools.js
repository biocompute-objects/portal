import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Search field
import SearchField from './Tools/SearchField';

// Logic field
import LogicField from './Tools/LogicField';

// Sharing object
import Sharing from './Tools/Sharing';

// Publish button
import Button from '@material-ui/core/Button';

// Regex box
import RegexBox from './Tools/RegexBox';

// Add condition
import AddCondition from './Tools/AddCondition';

// Servers
import ServerList from './Tools/ServerList';

// Confirm publishing
import PublishDialog from './Tools/PublishDialog';
import { Publish } from '@material-ui/icons';

// Rendering URL parameters.
// Source: https://stackoverflow.com/a/60312798
import { useNavigate } from 'react-router-dom';


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

export default function Tools({ objectIdDerivatives, setDraftSavingLocation, setPublishSavingLocation, setDownloadDraft, setSaveDraft, setPublish, publishedObjectId, publishMessage, receivedDefault, serverLock, setDeleteDraftPostPublish }) {
  
  // State
  const [saveDraftTo, setSaveDraftTo] = React.useState('');
  const [savePublishTo, setSavePublishTo] = React.useState('');

  // For publishing
  const [open, setOpen] = React.useState(false);
  const [retainDraft, setRetainDraft] = React.useState(false);

  // Is the user logged in?
  const [loggedInWithServers, setLoggedInWithServers] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);

  // return (
  //   loggedInWithServers
  //         ?
  //           <ServersHostnamesGroups items = { userInfo.apiinfo } savingLocation = { savingLocation } serverLock = { serverLock } setObjectId = { setObjectId } setSaveTo = { setSaveTo } type = { type } />
  //         :
  //           <Typography>You must be logged in to save or publish drafts.</Typography>
  // );
  

// // State
// const [selectedValue, setSelectedValue] = React.useState([]);

// // From the context
// const { objectOwner } = useContext(DeepContext);


  const classes = useStyles();

  // Define the actions for each click.
  const clickActions = (which) => {

    if(which === 'saveDraft') {
      
      // From parent.
      setSaveDraft(1);

    } else if(which === 'publishDraft') {

      // From parent.
      setOpen(true);

    } else if(which === 'downloadDraft') {
      
      // From parent.
      setDownloadDraft(1);

    } else if(which === 'deleteDraft') {
      
      // From parent.
      
      // setDeletingDraft(true);

    }

  }

  
  // ----- LISTENERS ----- //


  // Listen for a change in save location
  // to change the server lock.
  useEffect(() => {
    
    // UN-parse the saving location information.
    // The saving location information has to
    // be a string for the selects to not complain.
    
    // Prevent assignment on first render...
    // TODO: better way to do this?
    if(saveDraftTo !== '') {
      setDraftSavingLocation(
      
        {
          'hostname': saveDraftTo.split(' - ')[0],
          'group': saveDraftTo.split(' - ')[1]
        }
        
      );
    }

  }, [saveDraftTo, setDraftSavingLocation]);

  useEffect(() => {
    
    // UN-parse the saving location information.
    // The saving location information has to
    // be a string for the selects to not complain.
    setPublishSavingLocation(
      {
        'hostname': savePublishTo.split(' - ')[0],
        'group': savePublishTo.split(' - ')[1]
      }
      
    );

  }, [savePublishTo])

  // Keep the draft after publishing?
  useEffect(() => {
    setDeleteDraftPostPublish(!retainDraft);
  }, [retainDraft]);

  // Re-direct after publishing.
  // Source: https://stackoverflow.com/a/58536772/5029459
  const [redirect, setRedirect] = React.useState(false);
  
  useEffect(() => {
    
    if(redirect === true) {

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
    console.log('userInfoCheck: ', userInfoCheck)

    if(userInfoCheck !== null) {
      if(userInfoCheck.apiinfo.length > 0) {
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
          <Typography className={classes.heading} variant = 'h2'>Draft Sharing and Publishing</Typography>
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
              <Typography gutterBottom variant = 'h1'>
                Group Sharing
              </Typography>
              {
                objectIdDerivatives['rawName'] !== ""
                  ?
                    <Sharing objectIdDerivatives = { objectIdDerivatives } />
                  :
                    <Typography variant = 'h3'>
                      Please select a server to save your draft to in order to set permissions for the draft.
                    </Typography> 
              }
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
              <Typography gutterBottom variant = 'h1'>
                Saving and Publishing
              </Typography>
              {/* <SaveServer savingLocation = { savingLocation } serverLock = { serverLock } setObjectId = { setObjectId } setSaveTo = { setSaveTo } type = { 'draft' } /> */}
              <ServerList disabledValue = { serverLock } options = { userInfo === null ? null : userInfo['apiinfo'] } receivedDefault = { receivedDefault } setter = { setSaveDraftTo } type = { 'draft' } />
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="secondary" disableElevation disabled = { saveDraftTo === '' & receivedDefault === null ? true : false } fullWidth onClick={() => clickActions('saveDraft')}>
                SAVE DRAFT
              </Button>
              <Typography>
                &nbsp;
              </Typography>
              <ServerList disabledValue = { !serverLock } options = { userInfo === null ? null : userInfo['apiinfo'] } setter = { setSavePublishTo } type = { 'publish' } />
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="primary" disableElevation disabled = { savePublishTo === '' ? true : false } fullWidth onClick={() => clickActions('publishDraft')}>
                PUBLISH DRAFT
              </Button>
              <PublishDialog open = { open } publishMessage = { publishMessage } retainDraft = { retainDraft } setRetainDraft = { setRetainDraft } setRedirect = { setRedirect } setOpen = { setOpen } setter = { setPublish } />          
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => clickActions('downloadDraft')}>
                DOWNLOAD DRAFT
              </Button>
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="secondary" disableElevation disabled = { !serverLock } fullWidth onClick={() => clickActions('deleteDraft')}>
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
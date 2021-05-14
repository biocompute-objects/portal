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
import SearchField from './Tools/SearchField'

// Logic field
import LogicField from './Tools/LogicField'

// Sharing object
import Sharing from './Tools/Sharing'

// Save to server
import SaveServer from './Tools/SaveServer'

// Publish button
import Button from '@material-ui/core/Button'

// Regex box
import RegexBox from './Tools/RegexBox'

// Add condition
import AddCondition from './Tools/AddCondition'


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

export default function Tools({ savingLocation, setSavingLocation, setDownloadDraft, setSaveDraft, setPublish, complianceCheck, setComplianceCheck, objectId, serverLock }) {
  
  console.log('Here is the objectId:', objectId)
  
  // Saving information.
  const [saveTo, setSaveTo] = React.useState([]);
  const [writtenToServer, setWrittenToServer] = React.useState(false);
  
  const classes = useStyles();

  // Listen for an update to the saving location.
  // useEffect(() => {
  //   setLocation(saveTo);
  // }, [saveTo])

  // Define the actions for each click.
  const clickActions = (which) => {

    if(which === 'saveDraft') {

      setSaveDraft(1)

    } else if(which === 'publishDraft') {

      setPublish(1)

    } else if(which === 'downloadDraft') {
      
      setDownloadDraft(1)

    } else {

      console.log('delete')

    }

  }

  // Listen for a change in save location.
  // We don't use setSavingLocation directly.
  useEffect(() => {
    setSavingLocation(saveTo);
  }, [saveTo])

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
                objectId !== 'newDraft'
                  ?
                    <Sharing objectId = { objectId } />
                  :
                    null 
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
              <SaveServer savingLocation = { savingLocation } serverLock = { serverLock } setSaveTo = { setSaveTo } />
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="secondary" disableElevation disabled = {saveTo.length === 0 ? true : false} fullWidth onClick={() => clickActions('saveDraft')}>
                SAVE DRAFT
              </Button>
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="primary" disableElevation disabled = {saveTo.length === 0 ? true : false} fullWidth onClick={() => clickActions('publishDraft')}>
                PUBLISH DRAFT
              </Button>
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => clickActions('downloadDraft')}>
                DOWNLOAD DRAFT
              </Button>
              <Typography>
                &nbsp;
              </Typography>
              <Button variant="contained" color="secondary" disableElevation disabled = { !writtenToServer } fullWidth onClick={() => clickActions('deleteDraft')}>
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

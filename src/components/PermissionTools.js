// src/components/PermissionTools.js

import React, { useEffect, useState, useContext } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CreateDraftObject from 'src/components/API/CreateDraftObject';
import ModifyDraftObject from 'src/components/API/ModifyDraftObject';
import PublishDraftObject from 'src/components/API/PublishDraftObject';
import ValidateSchema from 'src/components/ValidateSchema';
import ServerList from 'src/utils/ServerList';
import { FetchContext } from 'src/App';

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

export default function PermissionTools({
  contents, publish, objectInformation, newDraft, setPublish
}) {
  // State
  const [saveDraftTo, setSaveDraftTo] = useState('');
  const [prefix, setPrefix] = useState('BCO');
  const [create, setCreate] = useState(false);
  const fc = useContext(FetchContext);
  const [userInfo, setUserInfo] = useState(null);
  const classes = useStyles();
  let ApiInfo = JSON.parse(localStorage.getItem('user'));
  if (ApiInfo === null) {
    // Use the anon token, which is publicly available.
    ApiInfo = fc.sending.anon_api_info;
    console.log('fc.sending.anon_api_info', fc.sending.anon_api_info);
  } else {
    // There was a user.
    ApiInfo = ApiInfo.apiinfo;
  }

  // Define the actions for each click.
  function clickActions(which) {
    if (which === 'saveDraft') {
      ModifyDraftObject(objectInformation, contents);
    } else if (which === 'createDraft') {
      CreateDraftObject(saveDraftTo, contents, prefix);
    } else if (which === 'validateDraft') {
      ValidateSchema(contents, setPublish, publish);
    } else if (which === 'publishDraft') {
      PublishDraftObject(objectInformation, contents);
    } else if (which === 'downloadDraft') {
      const bco = localStorage.getItem('bco');
      const blob = new Blob([bco], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = 'draftBCO.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (which === 'deleteDraft') {
      // From parent.
      // setDeletingDraft(true);
    }
  }

  // ----- INITIAL RENDER ----- //

  // Saving is only possible if a user is logged in
  // and has access to a server.
  useEffect(() => {
    // Logged in and has servers?
    const userInfoCheck = JSON.parse(localStorage.getItem('user'));

    if (userInfoCheck !== null) {
      if (userInfoCheck.apiinfo.length > 0) {
        setUserInfo(userInfoCheck);
      }
    }
  }, []);

  useEffect(() => {
    if (prefix.length >= 3 && prefix.length <= 5 && saveDraftTo !== '') {
      setCreate(true);
    }
  }, [prefix, saveDraftTo]);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            className={classes.heading}
            variant="h1"
          >
            Saving and Publishing (click to expand)

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h2">
                    Instructions
                  </Typography>
                  <Typography variant="h4">0) Select BCO Prefix to use for draft</Typography>
                  <Typography gutterBottom>
                    Select a specific BCO Prefix to use when CREATING a draft.
                  </Typography>
                  <Typography variant="h4">1) Select BCODB to save draft to</Typography>
                  <Typography gutterBottom>
                    Select a specific BCODB (server) to save your draft to when CREATING a draft.
                  </Typography>
                  <Typography gutterBottom variant="h4">
                    2)  CREATE NEW DRAFT
                  </Typography>
                  <Typography gutterBottom>
                    This button will be available once a BCODB is selected for DRAFT creation.
                  </Typography>
                  <Typography gutterBottom variant="h4">
                    3) SAVE CURRENT DRAFT
                  </Typography>
                  <Typography gutterBottom>
                    This button will be available if you are working on a DRAFT
                    currently in a BCODB.
                  </Typography>
                  <Typography gutterBottom variant="h4">
                    4) VALIDATE DRAFT
                  </Typography>
                  <Typography gutterBottom>
                    This function will validate the current DRAFT against the IEEE-2791-2020 schema.
                  </Typography>
                  <Typography gutterBottom variant="h4">
                    5) PUBLISH DRAFT
                  </Typography>
                  <Typography gutterBottom>
                    A DRAFT can not be published until it has passed validation.
                  </Typography>
                  <Typography gutterBottom variant="h4">
                    6)  DOWN LOAD DRAFT
                  </Typography>
                  <Typography gutterBottom>
                    This will downlaod a JSON of the current DRAFT
                  </Typography>
                  <Typography gutterBottom variant="h4">
                    7)  DELETE DRAFT
                  </Typography>
                  <Typography gutterBottom>
                    This function has not been implemented yet.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h2">
                    Functions
                  </Typography>
                  <ServerList
                    disabledValue={(newDraft === false)}
                    options={userInfo === null ? null : userInfo.apiinfo}
                    setter={setSaveDraftTo}
                    type="draft"
                  />
                  <Typography>
                    &nbsp;
                  </Typography>
                  <TextField
                    InputProps={{ className: classes.root }}
                    color="primary"
                    fullWidth
                    id="outlined-multiline-static"
                    variant="outlined"
                    onChange={(e) => setPrefix(e.target.value)}
                    value={prefix}
                  />
                  <Typography>
                    &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    disabled={(create === false)}
                    fullWidth
                    onClick={() => clickActions('createDraft')}
                  >
                    CREATE NEW DRAFT
                  </Button>
                  <Typography>
                &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    disabled={(newDraft === true)}
                    fullWidth
                    onClick={() => clickActions('saveDraft')}
                  >
                    SAVE CURRENT DRAFT
                  </Button>
                  <Typography>
                &nbsp;
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={publish === false}
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
                    // disabled={savePublishTo === ''}
                    fullWidth
                    onClick={() => clickActions('validateDraft')}
                  >
                    Validate DRAFT
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
                    disabled
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

PermissionTools.propTypes = {
  contents: PropTypes.object.isRequired,
  publish: PropTypes.bool.isRequired,
  objectInformation: PropTypes.object.isRequired,
  newDraft: PropTypes.bool,
  setPublish: PropTypes.func.isRequired,
};

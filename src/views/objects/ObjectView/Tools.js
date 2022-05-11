import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeriveDraftObject from 'src/components/API/DeriveDraftObject';
import ServerList from 'src/utils/ServerList';

const useStyles = makeStyles((theme) => ({
  centered: {
    textAlign: 'center'
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}));

export default function Tools() {
  const classes = useStyles();
  const [saveDraftTo, setSaveDraftTo] = useState('');
  const [prefix, setPrefix] = useState('');
  const userInfoCheck = JSON.parse(localStorage.getItem('user'));

  function clickActions(which) {
    if (which === 'createDraft') {
      DeriveDraftObject(saveDraftTo, prefix);
    }
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>EDIT OBJECT</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h3">
                    Derrive New Object Draft from this object
                  </Typography>
                  <Grid alignItems="center" container direction="row" justify="flex-start" spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                      <ServerList
                        disabledValue={(userInfoCheck === null)}
                        options={userInfoCheck.apiinfo}
                        setter={setSaveDraftTo}
                        type="draft"
                      />
                      <TextField
                        InputProps={{ className: classes.root }}
                        color="primary"
                        fullWidth
                        id="outlined-multiline-static"
                        variant="outlined"
                        placeholder='enter prefix'
                        onChange={(e) => setPrefix(e.target.value)}
                        value={prefix}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        disabled={(saveDraftTo === '' || prefix.length < 3 || prefix.length > 6)}
                        fullWidth
                        onClick={() => clickActions('createDraft')}
                      >
                        CREATE NEW DRAFT
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

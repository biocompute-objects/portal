// src/views/resources/Resources/Builder.js

import React from 'react';
import {
  Card,
  CardActionArea,
  // CardActions,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

// Routing to pages
// import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  linkCard: {
    minHeight: '300px',
    textAlign: 'center'
  },
  supportCard: {
    textAlign: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Registry() {
  const classes = useStyles();
  const logo = require('src/images/logo.png');
  const registryLink = 'https://portal.aws.biochemistry.gwu.edu/registry';

  return (
    <Card className={classes.root, classes.supportCard} elevation={5}>
      <CardActionArea href='https://docs.google.com/document/d/1io5OBfsdEif_nWX-TmA22fz7gayHR1MsEwv2vI_QGBY' target="_blank">
        <CardContent>
          <Typography className={classes.title}>
            <img src={logo} height={36} alt="BCO logo" />
            Technical Steering Committee
            <br />
          </Typography>
          <Typography>
            The Technical Steering Committee of the BioCompute Partnership
            (TSC) is a body of experienced professionals with BioCompute standard subject
            matter expertise. See here for the Meeting notes and agenda for all past and
            the upcomming meetings.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

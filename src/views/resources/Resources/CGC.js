// src/views/resources/Resources/CGC.js

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

export default function CGC() {
  const classes = useStyles();
  const logo = require('src/images/cgc.png');
  const cgcLink = 'https://www.cancergenomicscloud.org/';

  return (
    <Card className={`${classes.root} ${classes.supportCard}`} elevation={5}>
      <CardActionArea onClick={() => window.open(cgcLink)}>
        <CardContent>
          <Typography className={classes.title}>
            <img src={logo} height={36} alt="CGC logo" />
          </Typography>
          <Typography>
            The Cancer Genomics Cloud (CGC) has a powerful tool built into the
            CGC platform to capture and export a workflow as a BioCompute Object.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

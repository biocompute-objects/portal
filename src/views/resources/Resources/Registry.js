// src/views/resources/Resources/Builder.js

import React from 'react';
import { Card,
	CardActionArea,
	CardActions,
	CardContent,
	makeStyles,
	Typography
}from '@material-ui/core';

// Routing to pages
import { Link as RouterLink } from 'react-router-dom';

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
	marginBottom:12
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
  var logo = require('src/images/logo.png')
  var registryLink = 'https://portal.aws.biochemistry.gwu.edu/registry'

  return (
    <Card className={classes.root, classes.supportCard} elevation={5}>
      <CardActionArea onClick={() => window.open(registryLink)}>
        <CardContent>
            <Typography className={classes.title}>
              <img src={logo} height={36} alt="BCO logo"/>
              BCO Registry<br/>
            </Typography>
            <Typography >
              The BioCompute consortium maintains a database of registered 
authorities. Registered authorities are able to assign their own IDs in the 
object_id field, such as gwu000001.
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

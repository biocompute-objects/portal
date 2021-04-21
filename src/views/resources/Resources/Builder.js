// src/views/home/HomeView/Builder.js

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
    transform: 'scale(0.8)',
  },
  linkCard: {
      minHeight: '300px',
      textAlign: 'center'
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Builder() {
  const classes = useStyles();
  var logo = require('src/images/logo.png')

  return (
    <Card className={classes.root, classes.linkCard} elevation={0}>
      <CardActionArea className={classes.linkCard} component={RouterLink} to={"/builder"}>
        <CardContent>
            <Typography className={classes.title}>
              <img src={logo} height={100} alt="BCO logo"/><br/>
              BioCompute Builder
            </Typography>
            <Typography >
              Use the BioCompute Builder or view objects in the database.<br/>
		The BioCompute Builder is a platform-free, form-based editor.
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

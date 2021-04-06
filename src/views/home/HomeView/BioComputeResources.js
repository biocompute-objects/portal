// src/views/home/HomeView/BioComputeResorces.js

import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	makeStyles,
	Typography
}from '@material-ui/core';
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
  centered: {
      textAlign: 'center'
  },
  heightened: {
      minHeight: '250px'
  },
  title: {
    fontSize: '37px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BioComputeResources() {
  const classes = useStyles();

  return (
    <Card className={classes.root, classes.centered} elevation={2} >
      <CardActionArea component={RouterLink} to={"/resources"}>
        <CardContent className={classes.linkCard}>
          <Typography className={classes.title}>
            Cloud-based tools for working with BioCompute
          </Typography>
          <Typography>
            See our resources page for additional tools and services. 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

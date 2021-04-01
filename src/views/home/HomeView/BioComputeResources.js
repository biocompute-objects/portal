// src/views/home/HomeView/BioComputeResorces.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    <Card className={classes.root, classes.centered} elevation={2}>
        <CardContent>
            <Typography className={classes.title}>
            Cloud-based tools for working with BioCompute
            </Typography>
            <Typography>
              See our <a href="/resources"></a>resources page for additional tools and services. 
            </Typography>
        </CardContent>
    </Card>
  );
}

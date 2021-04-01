// src/views/home/HomeView/Media.js

import React from 'react';
import { Card,
	CardActionArea,
	CardActions,
	CardContent,
	makeStyles,
	Typography
}from '@material-ui/core';

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

export default function Media() {
  const classes = useStyles();

  return (
    <Card className={classes.root, classes.linkCard} elevation={0}>
      <CardContent>
          <Typography className={classes.title}>
          BioCompute Community
          </Typography>
          <Typography>
          Technical Steering Committee
          </Typography>
          <Typography>
          BioCompute Organization
          </Typography>
          <Typography>
          BioCompute Leadership
          </Typography>
      </CardContent>
    </Card>
  );
}

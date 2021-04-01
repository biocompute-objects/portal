// src/views/home/HomeView/Specification.js

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

export default function Specification() {
  const classes = useStyles();

  return (
    <Card className={classes.root, classes.linkCard}>
      <CardActionArea className={classes.linkCard} component={RouterLink} to={"/builder"}>
        <CardContent component={RouterLink} to={"/builder"}>
            <Typography className={classes.title}>
            BCO Specification
            </Typography>
            <Typography>
             sadgfhdsgfdf
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

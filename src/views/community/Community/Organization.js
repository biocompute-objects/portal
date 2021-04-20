// src/views/community/Community/Organization.js

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

export default function Organization() {
  const classes = useStyles();
  var logo = require('src/images/logo.png')

  return (
    <Card className={classes.root, classes.linkCard} elevation={0}>
      <CardActionArea className={classes.linkCard} component={RouterLink} to={"/builder"}>
        <CardContent>
            <Typography className={classes.title}>
              BioCompute Organization<br/>
              <img src={logo} height={100} alt="BCO logo"/><br/>
            </Typography>
            <Typography >
Two non-overlapping entities work in parallel to help drive BioCompute, the IEEE 2791-2020 Standard, and a Public Private Partnership. Leadership for the Public Private Partnership consists of an Executive Steering Committee and a Technical Steering Committee.
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

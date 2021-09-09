// src/views/community/Community/Leadership.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import logo from 'src/images/logo.png';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
    minHeight: '300px',
    textAlign: 'center',
    minWidth: 275
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Leadership() {
  const classes = useStyles();
  const leadership = 'https://www.biocomputeobject.org/community/#leadership';

  return (
    <Card className={classes.linkCard} elevation={0}>
      <CardActionArea onClick={() => window.open(leadership)}>
        <CardContent>
          <Typography className={classes.title}>
            BioCompute Leadership
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography>
            BioCompute is governed by an Executive Steering Committee, which
            engages in outreach and has executive oversight over the project, and a
            Technical Steering Committee, which builds tools and resources related to the
            IEEE-2791-2020 standard, and provides technical guidance to the community.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

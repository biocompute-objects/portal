// src/views/community/Community/Organization.js

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
  root: {

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
    minHeight: '300px',
    minWidth: 275,
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
  const organization = 'https://www.biocomputeobject.org/organization/';

  return (
    <Card className={classes.linkCard} elevation={0}>
      <CardActionArea onClick={() => window.open(organization)}>
        <CardContent>
          <Typography className={classes.title}>
            BioCompute Organization
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography>
            Two non-overlapping entities work in parallel to help drive
            BioCompute, the IEEE 2791-2020 Standard, and a Public Private Partnership.
            Leadership for the Public Private Partnership consists of an Executive
            Steering Committee and a Technical Steering Committee.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// src/views/resources/Resources/Hive.js

import React from 'react';
import {
  Card,
  CardActionArea,
  // CardActions,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  supportCard: {
    minHeight: '250px',
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

const hive = require('src/images/hive.png');
const aws = require('src/images/powered-by-aws.png');

const hiveLink = 'https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=main';

export default function Hive() {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${classes.supportCard}`} elevation={0}>
        <CardContent>
          <Typography className={classes.title}>
            <img src={hive} height={65} alt="HIVE logo" />
            <br />
            <img src={aws} height={35} alt="AWS logo" />
          </Typography>
          <Typography>
            The High-throughput Integrated Virtual Environment (HIVE) for
            genome analysis has platform specific tools for generating BioCompute Objects
            from workflows.
          </Typography>
        </CardContent>
    </Card>
  );
}

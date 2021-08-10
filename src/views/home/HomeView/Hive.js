// src/views/home/HomeView/Hive.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import hive from 'src/images/hive.png';
import aws from 'src/images/powered-by-aws.png';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  supportCard: {
    minHeight: '250px',
    minWidth: 275,
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

const hiveLink = 'https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=main';

export default function Hive() {
  const classes = useStyles();

  return (
    <Card className={classes.supportCard} elevation={0}>
      <CardActionArea onClick={() => window.open(hiveLink)}>
        <CardContent>
          <Typography className={classes.title}>
            <img src={hive} height={65} alt="HIVE logo" />
            <br />
            <img src={aws} height={35} alt="AWS logo" />
          </Typography>
          <Typography className={classes.bullet}>
            Access AWS HIVE, the High-Performance Integrated Virtual Environment, on AWS.
            HIVE is a cloud-based environment optimized for the storage and analysis
            of extra-large data, such as biomedical data, clinical data,
            next-generation sequencing (NGS) data, mass spectrometry files, confocal
            microscopy images, post-market surveillance data, medical recall data,
            and many others.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

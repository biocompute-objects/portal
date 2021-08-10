// src/views/community/Community/Services.js

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
    fontSize: '22px',
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
  }
});

export default function Services() {
  const classes = useStyles();
  const services = 'https://www.biocomputeobject.org/services/';
  const service = [
    'BCO Certification',
    'BCO Verification',
    'BCO Database',
    'BCO Technical Support'
  ];
  const serviceList = service.map((slist) => <li>{slist}</li>);

  return (
    <Card className={classes.linkCard} elevation={0}>
      <CardActionArea onClick={() => window.open(services)}>
        <CardContent>
          <Typography className={classes.title}>
            BioCompute Services
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography>
            The objective of the BioCompute Public-Private Partnership is to
            facilitate the efficient communication of certain critical elements of
            genomic analyses for the purpose of rendering genomic analyses more easily
            and beneficially consumed by research institutions, clinical and diagnostic
            care facilities, biotech and pharma entities, and regulatory bodies such
            as the FDA.
            <ol className={classes.bullet}>
              {serviceList}
            </ol>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

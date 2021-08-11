// src/views/home/HomeView/MyProfile.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
    minWidth: 275,
    minHeight: '300px',
    textAlign: 'center'
  },
  title: {
    fontSize: '33px',
  },
  subtitle: {
    fontSize: '20px',
  },
  pos: {
    marginBottom: 12,
  },
});

const docsLink = 'https://docs.biocomputeobject.org/';

export default function About() {
  const classes = useStyles();

  return (
    <Card className={classes.linkCard}>
      <CardActionArea onClick={() => window.open(docsLink)}>
        <CardContent className={classes.linkCard}>
          <Typography className={classes.title}>BioCompute Documentation</Typography>
          <Typography className={classes.subtitle}>External site</Typography>
          <Typography>
            <br />
            User Guide
            <br />
            Best Practices
            <br />
            SOP
            <br />
            Tutorials
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

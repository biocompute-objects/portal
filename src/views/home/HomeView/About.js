// src/views/resources/Resources/CGC.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

import mediaWiki from 'src/images/mediawikiwiki.svg';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  linkCard: {
    minHeight: '300px',
    textAlign: 'center'
  },
  supportCard: {
    textAlign: 'center',
    marginBottom: 12
  },
  title: {
    minWidth: 275,
    fontSize: '33px'
  },
  subtitle: {
    fontSize: '25px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function About() {
  const classes = useStyles();
  const wikiLink = 'https://wiki.biocomputeobject.org/index.php?title=Main_Page';
  const docsLink = 'https://docs.biocomputeobject.org/';

  return (
    <Card className={classes.supportCard} elevation={0}>
      <Typography className={classes.title}>
        BCO Documentation
        <br />
      </Typography>
      <CardActionArea onClick={() => window.open(wikiLink)}>
        <CardContent>
          
          <img src={mediaWiki}  alt="MediaWiki logo" />
            <Typography className={classes.subtitle}>BioCompute Wiki</Typography>
          <Typography className={classes.bullet}>
          The MediaWiki for the BioCompute Objects project
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea onClick={() => window.open(docsLink)}>
        <CardContent>
          <Typography className={classes.subtitle}>
            BCO Docs Site
            <br />
          </Typography>
          <Typography className={classes.bullet}>
            User Guide, Best Practices, tutorial
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

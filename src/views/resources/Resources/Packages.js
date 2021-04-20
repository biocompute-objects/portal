// src/views/resources/Resources/CGC.js

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
    transform: 'scale(0.8)'
  },
  linkCard: {
      minHeight: '300px',
      textAlign: 'center'
  },
  supportCard: { 
    textAlign: 'center',
	marginBottom:12
  },
  title: {
    fontSize: '33px',
  },
  subtitle: {
    fontSize: '25px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Packages() {
  const classes = useStyles();
  var bcoLogo = require('src/images/logo.png')
  var cranLogo = require('src/images/cran.png')
  var gitLogo = require('src/images/Octocat.png')
  var registryLink = 'https://portal.aws.biochemistry.gwu.edu/registry'
  var bcotoolLink = 'https://github.com/HadleyKing/bcotool/tree/1.1.0'
  var cranBCOLink = 'https://cran.r-project.org/web/packages/biocompute/index.html'

  return (
    <Card className={classes.root, classes.supportCard} elevation={5}>
      <Typography className={classes.title}>
        Software Packages<br/>
      </Typography>
      <CardActionArea onClick={() => window.open(cranBCOLink)}>
        <CardContent>
          <Typography className={classes.subtitle}>
            <img src={cranLogo} height={25} alt="CRAN logo"/>
            CRAN biocompute<br/>
          </Typography>
          <Typography className={classes.bullet}>
            Tools to create, validate, and export BioCompute Objects
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea onClick={() => window.open(bcotoolLink)}>
        <CardContent>
          <Typography className={classes.subtitle}>
            <img src={gitLogo} height={25} alt="BCO logo"/>
            BCO Tool<br/>
          </Typography>
          <Typography className={classes.bullet}>
            Command line tool to create, validate, and export BioCompute Objects
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

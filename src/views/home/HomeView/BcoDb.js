// src/views/home/HomeView/Builder.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import logo from 'src/images/logo.png';

// Routing to pages
import {Link}  from 'react-router-dom';

const useStyles = makeStyles({
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

export default function BcoDb() {
  const classes = useStyles();

  return (
    <Card className={classes.linkCard} elevation={0}>
      <CardActionArea className={classes.linkCard} component={Link} to='/objects'>
        <CardContent>
          <Typography className={classes.title}>
            BioCompute DB Search
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography className={classes.bullet}>
            Search the BioCompute DB and view objects in the database.
            <br />
            The BCODB page allwos searching and viewing BioCompute Objects from 
            any DB instance that a user has signed up for. The Public DB is accessable
            without an account or providing credentials. 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

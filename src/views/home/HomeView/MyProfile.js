// src/views/home/HomeView/MyProfile.js

import React, { useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Login from './Login';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Routing to pages
import { Link as RouterLink } from 'react-router-dom';

// Get the context from App.js
import { LoginContext } from '../../../App';

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

export default function MyProfile(fakeAuth) {
  const classes = useStyles();
  // Set the context.
  const context = useContext(LoginContext);

  var retrieveUser = localStorage.getItem('user');
  var userInfo = JSON.parse(retrieveUser)
  console.log('retrievedObject: ', JSON.parse(retrieveUser));

  if (context.isLoggedIn !== true) {
    return <Login />
  }
  
  return (
    <Card className={classes.root, classes.linkCard}>
      <CardActionArea className={classes.linkCard}>
        <CardContent component={RouterLink} to={"/account"}>
            <Typography className={classes.title}>
              My Profile
            </Typography>
              <Typography align="center"> { userInfo.email } </Typography>
              <Typography> { userInfo.username }</Typography>
              <Typography>{ userInfo.first_name } { userInfo.last_name }</Typography>
              <Typography>{ userInfo.email }</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

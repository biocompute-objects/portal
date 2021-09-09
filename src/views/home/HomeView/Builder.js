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
import { Link as RouterLink } from 'react-router-dom';

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

export default function Builder() {
  const classes = useStyles();

  return (
    <Card className={classes.linkCard} elevation={0}>
      <CardActionArea className={classes.linkCard} component={RouterLink} to="/builder">
        <CardContent>
          <Typography className={classes.title}>
            BioCompute Editor
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography className={classes.bullet}>
            Use the BioCompute Builder or view objects in the database.
            <br />
            The BioCompute Builder is a platform-free, form-based editor. The
            builder walks a user through building a BCO through text boxes,
            indicating which entries are required to adhere to the IEEE standard.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

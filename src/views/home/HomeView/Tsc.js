// src/views/home/HomeView/Tsc.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import logo from 'src/images/logo.png';

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

export default function Tsc() {
  const classes = useStyles();

  return (
    <Card className={classes.linkCard}>
      <CardActionArea href='https://docs.google.com/document/d/1io5OBfsdEif_nWX-TmA22fz7gayHR1MsEwv2vI_QGBY' target="_blank">
        <CardContent className={classes.linkCard}>
          <Typography className={classes.title}>
            <img src={logo} height={30} alt="BCO logo" />
            BCO TSC
          </Typography>
          <Typography className={classes.bullet}>
            The Technical Steering Committee of the BioCompute Partnership
            (TSC) is a body of experienced professionals with BioCompute standard subject
            matter expertise. See here for the Meeting notes and agenda for all past and
            the upcomming meetings.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

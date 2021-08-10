// src/views/community/Community/TechnicalSteeringCommittee.js

import React from 'react';
import {
  Button,
  Card,
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
  },
});

export default function TechnicalSteeringCommittee() {
  const classes = useStyles();

  return (
    <Card className={classes.linkCard} elevation={0}>
      <CardContent>
        <Typography className={classes.title}>
          <img src={logo} height={35} alt="BCO logo" />
          Monthly Technical Steering Committee Meeting
          <br />
        </Typography>
        <Typography>
          The Technical Steering Committee of the BioCompute Partnership
          (TSC) is a body of experienced professionals with BioCompute standard subject
          matter expertise. The primary purpose of the TSC as described in this initial
          charter falls into 2 categories:
          <ol className={classes.bullet}>
            <li>Promoting and supporting the BioCompute Standard</li>
            <li>Build Tools Related to the BioCompute Standard</li>
          </ol>
          <br />
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            See this Google Doc
          </Button>
          <br />
          for the Meeting notes and agenda for all past and the upcomming meetings.
          <br />
          <br />

          Meetings are held the 3rd Thursday of the month at 10:00 am Washington, DC time [EST]
          <br />
          Also see the Gitter for this groups discussions.
          <br />
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Join here
          </Button>
          <div>
            Meeting number: 120 613 0391
            <br />

            Join by phone
            <br />
            +1-415-655-0003 US TOLL
            <br />

            +1-855-282-6330 US TOLL FREE
            <br />

            Access code: 120 613 0391
            <br />
          </div>

        </Typography>
      </CardContent>
    </Card>
  );
}

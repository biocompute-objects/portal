// Source: https://material-ui.com/components/cards/#outlined-card

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function ServerSummary({ raw }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h2">
          Hostname
        </Typography>
        <Typography variant="h4">
          {raw.hostname}
        </Typography>
        <br />
        <Typography variant="h2">
          Human-readable Hostname
        </Typography>
        <Typography variant="h4">
          {raw.human_readable_hostname}
        </Typography>
        <br />
        <Typography variant="h2">
          Public hostname
        </Typography>
        <Typography variant="h4">
          {raw.public_hostname}
        </Typography>
        <br />
        <Typography variant="h2">
          Username
        </Typography>
        <Typography variant="h4">
          {raw.username}
        </Typography>
        <br />
        <Typography variant="h2">
          Token
        </Typography>
        <Typography variant="h4">
          {raw.token}
        </Typography>
      </CardContent>
    </Card>
  );
}

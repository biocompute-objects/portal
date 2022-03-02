// src/views/account/AccountView/Permissions.js
// Source: https://material-ui.com/components/cards/#simple-card

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  invisible: {
    display: 'none'
  },
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Permissions({ permissionSet }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {
          Object.keys(permissionSet).map((perm) => (
            <Typography variant="body2" component="p">
              {perm }
            </Typography>
          ))
        }
      </CardContent>
    </Card>
  );
}
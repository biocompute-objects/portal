import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  supportCard: { 
    minHeight: '250px',
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

export default function Technical() {
  const classes = useStyles();

  return (
    <Card className={classes.root, classes.supportCard} elevation={0}>
      <CardContent>
          <Typography className={classes.title}>
          Technical
          </Typography>
          <Typography>
          IEEE 2791-2020 Specification
          </Typography>
          <Typography>
          TSC Documents
          </Typography>
          <Typography>
          Other document
          </Typography>
      </CardContent>
    </Card>
  );
}
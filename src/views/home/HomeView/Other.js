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
  linkCard: {
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

export default function Other() {
  const classes = useStyles();

  return (
    <Card className={classes.root, classes.linkCard} elevation={0}>
      <CardContent>
          <Typography className={classes.title}>
          Other
          </Typography>
          <Typography>
          Link 1
          </Typography>
          <Typography>
          Link 2
          </Typography>
      </CardContent>
    </Card>
  );
}

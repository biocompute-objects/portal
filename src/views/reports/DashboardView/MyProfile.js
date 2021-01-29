import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Routing to pages
import { Link as RouterLink } from 'react-router-dom';

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
      minHeight: '242px',
      textAlign: 'center'
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyProfile() {
  const classes = useStyles();

  return (
    <Card className={classes.root, classes.linkCard}>
      <CardActionArea className={classes.linkCard}>
        <CardContent component={RouterLink} to={"/account"}>
            <Typography className={classes.title}>
            My Profile
            </Typography>
            <Typography>
            Sign in to access services
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

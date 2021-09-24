import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: '0',
      marginRight: '0'
    },
  },
}));

export default function SearchField() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField fullWidth={true} id="standard-basic" label="Condition" variant="outlined" />
    </form>
  );
}
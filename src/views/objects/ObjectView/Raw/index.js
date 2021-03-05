import React, { useState } from 'react';
import {
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	prewrapped: {
		whiteSpace: 'pre-wrap'
	},
	root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
	}
}));

const Raw = ({ contents }) => {
    
  const classes = useStyles();

  return (
    <Typography className={classes.prewrapped}>
    	{JSON.stringify(contents, null, 4)}
    </Typography>
  );
};

export default Raw;

import React from 'react';
import {
  Card,
  makeStyles
} from '@material-ui/core';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BcoDbViewer() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <TwitterTimelineEmbed
        noFooter
        sourceType="profile"
        screenName="BioComputeObj"
        options={{ height: 800 }}
      />
    </Card>
  );
}

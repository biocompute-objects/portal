// src/views/home/HomeView/FdaBox.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
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

export default function FdaBar() {
  const classes = useStyles();
  const fdaLink = 'https://www.federalregister.gov/documents/2020/07/22/2020-15771/electronic-submissions-data-standards-support-for-the-international-institute-of-electrical-and';

  return (
    <Card className={classes.linkCard}>
      <CardActionArea onClick={() => window.open(fdaLink)}>
        <CardContent className={classes.linkCard}>
          <Typography className={classes.title}>
            FDA Notice on BioCompute
          </Typography>
          <Typography className={classes.bullet}>
            Electronic Submissions; Data Standards;
            Support for the International Institute of Electrical and Electronics Engineers Bioinformatics
            Computations and Analyses Standard for Bioinformatic Workflows.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

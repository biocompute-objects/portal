import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ObjectsListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Page
      className={classes.root}
      title="BioCompute Objects"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Results customers={customers} />
      </Container>
    </Page>
  );
};

export default ObjectsListView;

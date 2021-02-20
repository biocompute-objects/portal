import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

// Rendering dynamic JSON.
import RecursiveJson from './RecursiveJson'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ObjectsList = () => {
    
  const classes = useStyles();

  // Define the JSON object.   
  const objected = {
  };
  
  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <RecursiveJson items={objected} propertiesFlag={false} />
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ObjectsList;
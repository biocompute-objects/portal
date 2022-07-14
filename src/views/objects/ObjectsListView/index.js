// src/views/objects/ObjectsListView/index.js

import React, { useEffect, useContext, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Typography from '@material-ui/core/Typography';
// import Async from 'react-async';
import Results from 'src/views/objects/ObjectsListView/Results';
import Toolbar from 'src/components/ObjectsListViewToolbar';

// Fetch context.
import { FetchContext } from '../../../App';

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

  //  Fetch context.
  const fc = useContext(FetchContext);

  // Function and state for loading object listing
  const [loading, setLoading] = useState(true);
  // const [tokenContents, setTokenContents] = useState();
  const [rows, setRows] = useState([]);
  // First get the API info.
  let ApiInfo = {};
  const user = JSON.parse(localStorage.getItem('user'));
  // If there is no user info stored, assume we're the anonymous user.
  if (user === null) {
    // Use the anon token, which is publicly available.
    ApiInfo = fc.sending.anon_api_info;
  } else {
    // There was a user.
    ApiInfo = user.apiinfo;
  }

  // this function creates the row items. Use this later to add the select columns ability
  function createData(
    name,
    public_hostname,
    contents,
    last_update,
    object_class,
    object_id,
    owner_group,
    owner_user,
    prefix,
    schema,
    state
  ) {
    return {
      name,
      public_hostname,
      contents,
      last_update,
      object_class,
      object_id,
      owner_group,
      owner_user,
      prefix,
      schema,
      state
    };
  }

  return (
    <Page
      className={classes.root}
      title="BioCompute Objects"
    >
      <Container maxWidth={false}>
        <Typography variant="h3">
          BioCompute Object DB
        </Typography>
        <Box>
          <Toolbar
            ApiInfo={ApiInfo}
            setRows={setRows}
          />
        </Box>
        <Box>
          <Results rowInfo={rows} />
        </Box>
      </Container>
    </Page>
  );
};

export default ObjectsListView;

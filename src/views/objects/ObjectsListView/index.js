// src/views/objects/ObjectsListView/index.js

import React, { useEffect, useContext, useState } from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Typography from '@material-ui/core/Typography';
import Results from './Results';
// import Toolbar from '../../../components/ObjectsListViewToolbar.js';
import RetrieveObjectsFromToken from '../../../components/API/RetrieveObjectsFromToken.js'
import Async from 'react-async';

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
  const [rows, setRows] = useState();
  // First get the API info.
  var ApiInfo = {}
  var thing = {}
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
  function createData(name, public_hostname, contents, last_update, object_class, object_id, owner_group, owner_user, prefix, schema, state) {
    return {name, public_hostname, contents, last_update, object_class, object_id, owner_group, owner_user, prefix, schema, state};
  }; 

  // Row data
  var rowData = [];

  const getObjectsListing = () => {

    // First get the API info.
    let ApiInfo = JSON.parse(localStorage.getItem('user'));

    // If there is no user info stored, assume we're the anonymous user.
    if (ApiInfo === null) {

      // Use the anon token, which is publicly available.
      ApiInfo = fc.sending.anon_api_info;
    } else {

      // There was a user.
      ApiInfo = ApiInfo.apiinfo;

    }
    
    console.log(ApiInfo);

    // Get the info for each API.
    ApiInfo.forEach((item) => {

      // Call the API using the server information
      // associated with the user.
      fetch(`${item['public_hostname']}/api/objects/token/`, {
        method: 'POST',
        body: JSON.stringify({
          'POST_api_objects_token': {}
        }),
        headers: {
          Authorization: `Token ${item.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => response.json()).then((data) => {

        console.log('data: ', data);
        
        data.map(d_item => {
          
          // The provenance domain name may not be defined.
          try {
            d_item['name'] = d_item['contents']['provenance_domain']['name'];
          } catch(TypeError) {
            d_item['name'] = 'N/A'
          }

          rowData.push(
            createData(
              d_item['name'],
              item['public_hostname'],
              d_item['contents'],
              d_item['last_update'],
              d_item['object_class'],
              d_item['object_id'],
              d_item['owner_group'],
              d_item['owner_user'],
              d_item['prefix'],
              d_item['schema'],
              d_item['state'],
            )
          );
      });

        // We're no longer loading.
        setRows(rowData);
        setLoading(false);

      });

    });

  };

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    getObjectsListing();
  }, [loading]);


  return (
    <Page
      className={classes.root}
      title="BioCompute Objects"
    >
      <Container maxWidth={false}>
        {/* Disabled until button functions can be written
        <Toolbar />
        */}
        {
          loading
            ? (
              <div>
                <Typography>Loading...</Typography>
              </div>
            )
            : <Results rowInfo={rows} />
        }
      </Container>
    </Page>
  );
};

export default ObjectsListView;

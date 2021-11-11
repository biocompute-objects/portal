// src/views/objects/ObjectsListView/index.js

import React, { useEffect, useContext, useState } from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Typography from '@material-ui/core/Typography';
import Async from 'react-async';
import Results from './Results';
// import Toolbar from '../../../components/ObjectsListViewToolbar.js';
import RetrieveObjectsFromToken from '../../../components/API/RetrieveObjectsFromToken.js';

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
  let ApiInfo = {};
  const thing = {};
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
    return {
      name, public_hostname, contents, last_update, object_class, object_id, owner_group, owner_user, prefix, schema, state
    };
  }

  // Row data
  const rowData = [];

  const getObjs = function getObjects(item) {
    return fetch(`${item.public_hostname}/api/objects/token/`, {
      method: 'POST',
      body: JSON.stringify({
        POST_api_objects_token: {}
      }),
      headers: {
        Authorization: `Token ${item.token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((response) => {
      return [item.public_hostname, response.json()];
    });
  };

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
    // console.log(ApiInfo);
    // Get the info for each API.
    const results = Promise.all(ApiInfo.map(getObjs));
    results.then((data) => {
      console.log('Output ', data);
      // data.forEach((d) => {
      const promises = data.map((apiAndPromise) => {
        // The provenance domain name may not be defined.
        if (apiAndPromise.length !== 2) {
          console.log("ERROR: This shouldn't ever be hit.");
        }
        const apiServer = apiAndPromise[0];
        return apiAndPromise[1].then((dItems) => {
          dItems.forEach((dItem) => {
            try {
              dItem.name = dItem.contents.provenance_domain.name;
            } catch (TypeError) {
              dItem.name = 'N/A';
            }

            rowData.push(
              createData(
                dItem.name,
                apiServer,
                dItem.contents,
                dItem.last_update,
                dItem.object_class,
                dItem.object_id,
                dItem.owner_group,
                dItem.owner_user,
                dItem.prefix,
                dItem.schema,
                dItem.state,
              )
            );
          });
        });
      });
      // We should have all of the promises for the various servers now
      // wait for them all to finish and then populate the table.
      Promise.all(promises).then((r) => {
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

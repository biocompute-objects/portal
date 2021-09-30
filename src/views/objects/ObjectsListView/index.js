// src/views/objects/ObjectsListView/index.js

import React, { useEffect, useContext, useState } from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Typography from '@material-ui/core/Typography';
import Results from './Results';
// import Toolbar from './Toolbar';

// Checking for field value existence
import cF from '../../../utils/cF';

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
  const [rows, setRows] = useState();

  function createData(objectId, objectIdToken, name, state, source, lastUpdated) {
    return {
      objectId, objectIdToken, name, state, source, lastUpdated
    };
  }

  // Row data
  const rowData = [];

  const getObjectsListing = () => {
    // First get the API info.
    let ApiInfo = JSON.parse(localStorage.getItem('user'));
    console.log(ApiInfo);
    // If there is no user info stored, assume we're the anonymous user.
    if (ApiInfo === null) {
      // Use the anon token, which is publicly available.
      ApiInfo = fc.sending.anon_api_info;
      console.log(ApiInfo);
      ApiInfo.forEach((item) => {
        // Call the API using the server information
        // associated with the user.
        fetch(`${item.public_hostname}/api/objects/token/`, {
          method: 'POST',
          body: JSON.stringify({
            token: item.token
          }),
          headers: {
            Authorization: `Token ${item.token}`,
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((response) => response.json()).then((data) => {
          console.log('+++++++++++++++++', data);
          Object.values(data.bco_publish).forEach((objectInfo) => rowData.push(createData(
            objectInfo.fields.object_id,
            item.token,
            cF(cF(objectInfo.fields.contents.provenance_domain).name),
            objectInfo.fields.state,
            item.human_readable_hostname,
            cF(cF(objectInfo.fields.contents.provenance_domain).modified)
          )));
          // We're no longer loading.
          setRows(rowData);
          setLoading(false);
        });
      });
    } else {
      // There was a user.
      ApiInfo = ApiInfo.apiinfo;
      ApiInfo.forEach((item) => {
        // Call the API using the server information
        // associated with the user.
        fetch(`${item.public_hostname}/api/objects/token/`, {
          method: 'POST',
          body: JSON.stringify({
            token: item.token
          }),
          headers: {
            Authorization: `Token ${item.token}`,
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((response) => response.json()).then((data) => {
          console.log('+++++++++++++++++', data);

          Object.keys(data).forEach((tableName) => {
            Object.values(data[tableName]).forEach((objectInfo) => rowData.push(createData(
              objectInfo.fields.object_id,
              item.token,
              cF(cF(objectInfo.fields.contents.provenance_domain).name),
              objectInfo.fields.state,
              item.human_readable_hostname,
              cF(cF(objectInfo.fields.contents.provenance_domain).modified)
            )));
          });
          // We're no longer loading.
          setRows(rowData);
          setLoading(false);
        });
      });
    }

    // For each host, get the information.
  };

  useEffect(() => {
    setLoading(true);
    getObjectsListing();
  }, []);

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

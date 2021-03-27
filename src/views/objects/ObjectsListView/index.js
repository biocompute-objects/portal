import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { PictureAsPdfOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

// Checking for field value existence
import cF from '../../../utils/cF'

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

  // Function and state for loading object listing
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState();

  function createData(objectId, name, state, source, lastUpdated) {
      return { objectId, name, state, source, lastUpdated };
  }

  // Row data
  var rowData = [];

  const getObjectsListing = () => {
    
    // Call the API.
    //fetch('http://127.0.0.1:8000/bco/objects/read/', {
    fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/read/', {
      method: 'POST',
      body: JSON.stringify({
        POST_read_object: [
          {
            table: 'bco_draft'
          },
          {
            table: 'bco_publish'
          }
        ]
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    }).then(response=>response.json()).then(data=>{
      
      console.log('+++++++++++++++++', data)
      // Get the bulk response.
      const bulkResponse = data.POST_read_object;

      // Go over each result.
      for(let responseInfo of bulkResponse) {

        // Were the objects found?
        if(responseInfo.request_code === '200') {
          
          responseInfo.content.map(item => {
            
              // Tweak the draft IDs so that we are taken to the builder upon clicking.
              if(item.fields.object_id.indexOf('DRAFT') !== -1) {

                // Reconstruct the URL.
                var splitUp = item.fields.object_id.split('/');
                splitUp = 'http://' + splitUp[2] + '/builder/' + splitUp[3];
                
                // Push data.
                rowData.push(createData(splitUp, cF(cF(item.fields.contents.provenance_domain).name), item.fields.state, 'GWU-HIVE - 24.35.124.3 (Hadley King)', '01/29/21'));

              } else {
                rowData.push(createData(item.fields.object_id, cF(cF(item.fields.contents.provenance_domain).name), item.fields.state, 'GWU-HIVE - 24.35.124.3 (Hadley King)', '01/29/21'));
              }

            }
          )

        }

      }

      // We're no longer loading.
      setRows(rowData);
      setLoading(false);

    })
    
  }

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
        <Toolbar />
        {
          loading
            ?
              <div>
                <Typography>Loading...</Typography>
              </div>
            :
              <Results rowInfo={rows} />
        }
      </Container>
    </Page>
  );
};

export default ObjectsListView;

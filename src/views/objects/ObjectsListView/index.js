import React, { useContext, useEffect, useState } from 'react';
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

  // Fetch context.
  const fc = useContext(FetchContext);

  // Function and state for loading object listing
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState();

  function createData(objectId, objectIdToken, name, state, source, lastUpdated) {
      return { objectId, objectIdToken, name, state, source, lastUpdated };
  }

  // Row data
  var rowData = [];

  const getObjectsListing = () => {
    
    // First get the API info.
    var ApiInfo = JSON.parse(localStorage.getItem('user'));

    // If there is no user info stored, assume we're the anonymous user.
    if(typeof(ApiInfo) === null) {

      // Use the anon token, which is publicly available.
      ApiInfo = [{

      }];

    } else {

      // There was a user.
      ApiInfo = ApiInfo['apiinfo'];

    }

    // For each host, get the information.
    ApiInfo.map(item => {

      // Call the API using the server information
      // associated with the user.
      // fetch('http://127.0.0.1:8000/api/objects/token/', {
      // 'https://' + item['hostname'] + '/api/objects/token/'
      fetch('http://' + item['hostname'] + '/api/objects/token/', {
        method: 'POST',
        body: JSON.stringify({
          token: item['token']
      }),
      headers: {
          "Authorization": "Token " + item['token'],
          "Content-type": "application/json; charset=UTF-8"
      }
      }).then(response=>response.json()).then(data=>{
        
        console.log('+++++++++++++++++', data)

        // Go over each result.
        for(let tableName of Object.keys(data)) {

          // Go over each object for each table.
          for(let objectInfo of data[tableName]) {
            console.log('objectInfo ', objectInfo)
            rowData.push(createData(objectInfo['fields']['object_id'], item['token'], cF(cF(objectInfo.fields.contents.provenance_domain).name), objectInfo['fields']['state'], item['human_readable_hostname'], '01/29/21'));
          }
          
          // Push data.
          // rowData.push(createData(splitUp, cF(cF(item.fields.contents.provenance_domain).name), item.fields.state, item['human_readable_hostname'], '01/29/21'));






          // // Were the objects found?
          // if(responseInfo.request_code === '200') {
            
          //   responseInfo.content.map(item => {
              
          //       // Tweak the draft IDs so that we are taken to the builder upon clicking.
          //       if(item.fields.object_id.indexOf('DRAFT') !== -1) {

          //         // Reconstruct the URL.
          //         var splitUp = item.fields.object_id.split('/');
          //         splitUp = 'http://' + splitUp[2] + '/builder/' + splitUp[3];
                  
          //         // Push data.
          //         rowData.push(createData(splitUp, cF(cF(item.fields.contents.provenance_domain).name), item.fields.state, 'GWU-HIVE - 24.35.124.3 (Hadley King)', '01/29/21'));

          //       } else {
          //         rowData.push(createData(item.fields.object_id, cF(cF(item.fields.contents.provenance_domain).name), item.fields.state, 'GWU-HIVE - 24.35.124.3 (Hadley King)', '01/29/21'));
          //       }

          //     }
          //   )

          // }






        }

      })

    })

    // We're no longer loading.
    console.log('rowData', rowData)
    setRows(rowData);
    setLoading(false);
    
  }

useEffect(() => {
  setLoading(true);
  getObjectsListing();
}, []);

  return (
    <Page
      className = {classes.root}
      title = "BioCompute Objects"
    >
      <Container maxWidth = {false}>
        <Toolbar />
        {
          loading
            ?
              <div>
                <Typography>Loading...</Typography>
              </div>
            :
              <Results rowInfo = {rows} />
        }
      </Container>
    </Page>
  );
};

export default ObjectsListView;

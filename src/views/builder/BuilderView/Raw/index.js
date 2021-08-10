import React, { useContext, useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Multiline Input
import TextField from '@material-ui/core/TextField';

// Checking for field value existence
import cF from '../../../../utils/cF';

// JSON errors
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// There is a problem with the parser returning HTML strings,
// so convert.
// Source: https://stackoverflow.com/a/55884366/5029459
import ReactHtmlParser from 'react-html-parser';

// Fetch context.
import { FetchContext } from '../../../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  errors: {
    backgroundColor: 'red'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function Raw({ downloading, setDownloading, saving, setSaving, publishing, setPublishing, compCheck, contents }) {
  
  // As of 5/13/21, there is no relationship between the color-coded
  // draft view and the raw draft view.
  
  console.log('typeof(contents): ', typeof(contents));
  const classes = useStyles();

  // Fetch context.
  const fc = useContext(FetchContext);

  // Arguments
  // ---------
  // items: JSON object (Usability Domain)


  // ----- Meta Information ----- //

  
  // None.


  // ----- Usability ----- //

  // State

  // Raw contents

  // The object MUST be saved as valid JSON, see below in useEffect.
  const [rawContents, setRawContents] = useState(JSON.stringify(contents, null, 4));
  const [jsonErrors, setJsonErrors] = useState('');

  // useEffect to load the JSONlint parser.
  // Source (React Hooks section): https://betterprogramming.pub/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
  // Source: https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github
  // Source: https://github.com/zaach/jsonlint/
  useEffect(() => {
    
    require('./json2.js');
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/zaach/jsonlint/web/jsonlint.js";
    script.async = true;
    document.body.appendChild(script);

  return () => {
      document.body.removeChild(script);
    }
  
  }, []);

  // TODO: Make sure this is written correctly?

  // For saving drafts
  useEffect(() => {

    // Default to the loading state.
    //setLoading(true);

    // Update the draft.    
    if(saving === 1) {

      // See if we have valid JSON (required).
      // This is better than having to parse line breaks,
      // new lines, etc...
      try {

        // First, see if we have any errors.        
        window.jsonlint.parse(rawContents);

        // UNSET JSON errors
        setJsonErrors('');

          // TODO: Find cleaner way to send this?
          // De-structure the URL.

          // Split the URI and re-construct the route.
          const splitUp = window.location.href.split('/');
          const destructured = splitUp[0] + '//' + splitUp[2] + '/' + splitUp[4];

          // Note that we save the object WITHOUT pretty printing.
          // Thus, we have to use a manual call here.
          // TODO: Fix?  Probably have too many stringify/parses here?
          const draftSave = JSON.stringify(JSON.parse(document.getElementById('outlined-multiline-static').value));
          console.log('draftSave:', JSON.parse(draftSave))
          
          // Call the API.
          fetch(fc['sending']['bcoapi_objects_create'], {
            method: 'POST',
            body: JSON.stringify({
              POST_create_new_object: [
                  {
                    table: 'bco_draft',
                    object_id: destructured,
                    schema: 'IEEE',
                    contents: JSON.parse(draftSave),
                    state: 'DRAFT'
                  }
              ]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
          }).then(response=>response.json()).then(data=>{
            
            console.log('+++++++++++++++++', data);

            // Get the bulk response.
            const bulkResponse = data.POST_create_new_object[0];

            // Was the object found?
            if(bulkResponse.request_code === '200') {
              
              // We found the object, so set the data.
              alert('The object with ID \n\n' + destructured + '\n\n was saved successfully.')

            } else {

              // There was a problem, so show what it was.
              alert('There was a problem saving the object with ID \n\n' + destructured + '\n\n  See errors below...\n\n' + bulkResponse.message);
        
            }

          })

        } catch (e) {
          
          // JSON Error
          setJsonErrors(e);

      }

      // We're no longer saving.
      setSaving(0);
      
    }
    
  }, [saving]);

  // For publishing drafts
  useEffect(() => {

    // Update the draft.    
    if(publishing === 1) {

      // In order to publish, we MUST have a compliant
      // object.

      // See if we have valid JSON (required).
      // This is better than having to parse line breaks,
      // new lines, etc...
      try {

        // First, see if we have any errors.        
        window.jsonlint.parse(rawContents);

        // UNSET JSON errors
        setJsonErrors('');

        // The object is JSON, but is it valid?
        // Note that we save the object WITHOUT pretty printing.
        // Thus, we have to use a manual call here.
        // TODO: Fix?  Probably have too many stringify/parses here?
        const draftSave = JSON.parse(document.getElementById('outlined-multiline-static').value);

        // Do a simple call to find out.
        // Call the API.
        fetch(fc['sending']['bcoapi_objects_create'], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                POST_validate_payload_against_schema: [
                    {
                        payload: draftSave, 
                        schema_server: 'IEEE/IEEE2791-2020.schema'
                    }
                ]
            }),
            }).then(res => res.json()).then(json => {

                // If the contents aren't null, then update the errors.
                if(json.POST_validate_payload_against_schema.contents !== null) {

                  setJsonErrors(json.POST_validate_payload_against_schema.contents);

                } else {

                  // Schema passed, so publish the object.
                  // TODO: Find cleaner way to send this?
                  // De-structure the URL.

                  // Split the URI and re-construct the route.
                  const splitUp = window.location.href.split('/');
                  const destructured = splitUp[0] + '//' + splitUp[2] + '/' + splitUp[4];
                  
                  // Call the API. 
                  fetch(fc['sending']['bcoapi_objects_create'], {
                    method: 'POST',
                    body: JSON.stringify({
                      POST_create_new_object: [
                          {
                            table: 'bco_publish',
                            schema: 'IEEE',
                            contents: draftSave,
                            state: 'PUBLISHED'
                          }
                      ]
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                  }).then(response=>response.json()).then(data=>{
                    
                    console.log('+++++++++++++++++', data);

                    // Get the bulk response.
                    const bulkResponse = data.POST_create_new_object[0];

                    // Was the object found?
                    if(bulkResponse.request_code === '200') {
                      
                      // We found the object, so set the data.
                      alert('The DRAFT object with ID \n\n' + destructured + '\n\n was saved successfully with PUBLISHED ID \n\n' + bulkResponse['object_id']);

                    } else {

                      // There was a problem, so show what it was.
                      alert('There was a problem saving the object with ID \n\n' + destructured + '\n\nSee errors below...\n\n' + bulkResponse.message);
                
                    }
                    
                  })
                }
            })

      } catch(e) {

        // JSON Error
        setJsonErrors(e);
          
      }

      // We're no longer publishing.
      setPublishing(0);

    }
    
  }, [publishing]);

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based 
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInput = (event) => {

    // Set the state variable.
    setRawContents(event.target.value);

  }

  return(
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h3">
              Raw JSON
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledCell>
            <TextField
              color="primary"
              fullWidth
              id="outlined-multiline-static"
              multiline
              onChange={(e) => setInput(e)}
              rows={18}
              value={cF(rawContents)} 
              variant="outlined"
            />
          </StyledCell>
        </TableRow>
        <TableRow>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={jsonErrors !== '' ? classes.errors : classes.pass} variant="h5" component="h2">
              { ReactHtmlParser(jsonErrors) }
            </Typography>
          </CardContent>
        </Card>
        </TableRow>
      </TableBody>
    </Table>
  );
}
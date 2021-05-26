import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Inputs
import TextField from '@material-ui/core/TextField';

// Add buttons
import Button from '@material-ui/core/Button';

// Section cell styling
const useStyles = makeStyles((theme) => ({
  header: {
    color: 'white'
  },
  missingHeader: {
    color: 'red'
  },
  root: {
    color: 'white'
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
export default function IoDomain({ items, cF }) {
  
  const classes = useStyles();

  // State for showing missing sections.
  const [missingIoDomain, setMissingIoDomain] = useState(true);
  const [missingInputSubdomain, setMissingInputSubdomain] = useState(false);
  const [missingInputSubdomainUri, setMissingInputSubdomainUri] = useState(false);
  const [missingOutputSubdomain, setMissingOutputSubdomain] = useState(false);
  const [missingOutputSubdomainMediatype, setMissingOutputSubdomainMediatype] = useState(false);
  const [missingOutputSubdomainUri, setMissingOutputSubdomainUri] = useState(false);

  useEffect(() => {
    
    // Create an OR flag.
    var orFlag = false;

    // Input subdomain
    if(items.iodInputSubdomain.length === 0) {

      // No input subdomain.
      setMissingInputSubdomain(true);

      // No sub-fields.
      setMissingInputSubdomainUri(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there is an input subdomain, we have to consider
      // the necessary subfields.

      // Each field must be treated independently so that
      // our state is compared only to the relevant field.

      // Assume the header is not red.
      setMissingInputSubdomain(false);

      // Each one of the input files.
      for(var i = 0; i < items.iodInputSubdomain.length; i++) {

        // URI
        if(items.iodInputSubdomain[i].uri.uri === "") {
          
          // No URI.
          setMissingInputSubdomainUri(true);

          // Header
          setMissingInputSubdomain(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingInputSubdomainUri(false);
        }

        // Can't rely on orFlag here for same reason as other domains.
        
      }
      
    }

    // Output subdomain
    if(items.iodOutputSubdomain.length === 0) {

      // No output subdomain.
      setMissingOutputSubdomain(true);

      // No sub-fields.
      setMissingOutputSubdomainMediatype(true);
      setMissingOutputSubdomainUri(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there is an output subdomain, we have to consider
      // the necessary subfields.

      // Each field must be treated independently so that
      // our state is compared only to the relevant field.

      // Assume the header is not red.
      setMissingOutputSubdomain(false);

      // Each one of the output files.
      for(var i = 0; i < items.iodOutputSubdomain.length; i++) {

        // Mediatype
        if(items.iodOutputSubdomain[i].mediatype === "") {
          
          // No mediatype.
          setMissingOutputSubdomainMediatype(true);

          // Header
          setMissingOutputSubdomain(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingOutputSubdomainMediatype(false);
        }

        // Can't rely on orFlag here for same reason as other domains.
        
      }

      // Each one of the output files.
      for(var i = 0; i < items.iodOutputSubdomain.length; i++) {

        // URI
        if(items.iodOutputSubdomain[i].uri.uri === "") {
          
          // No URI.
          setMissingOutputSubdomainUri(true);

          // Header
          setMissingOutputSubdomain(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingOutputSubdomainUri(false);
        }

        // Can't rely on orFlag here for same reason as other domains.
        
      }
      
    }

    // Was one OR the other missing in the pipeline input/output?
    if(orFlag) {
      setMissingIoDomain(true);
    } else {

      // All required fields are ok.
      setMissingInputSubdomainUri(false);
      setMissingOutputSubdomainMediatype(false);
      setMissingOutputSubdomainUri(false);

      setMissingInputSubdomain(false);
      setMissingOutputSubdomain(false);
      setMissingIoDomain(false);

    }

  }, [items]);

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based 
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInputInput = (event, i, inputName) => {
    
    // Get the state variable.
    var dummy = items.iodInputSubdomain;

    // Change the value at the given index.
    dummy[i]['uri'][inputName] = event.target.value;

    // Update the state.
    items.setIodInputSubdomain(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }
  
  // Add a row (input)
  const addRowsInput = () => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = items.iodInputSubdomain;

    // Push the new row.
    dummy.push({
      "uri": {
        "filename": "",
        "uri": "",
        "access_time": "",
        "sha1_checksum": ""
      }
    });

    // Update the state.
    items.setIodInputSubdomain(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row (input)
  const removeRowsInput = (which) => {

    // Get the state variable.
    var dummy = items.iodInputSubdomain;

    // Remove the index.
    dummy.splice(which, 1);

    // Update the state.
    items.setIodInputSubdomain(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  const setInputOutput = (event, i, inputName, mediatype=false) => {
    
    // Get the state variable.
    var dummy = items.iodOutputSubdomain;

    // Change the value at the given index.

    // Mediatype?
    if(mediatype === true) {
      dummy[i]['mediatype'] = event.target.value;
    } else {
      dummy[i]['uri'][inputName] = event.target.value;
    }
    
    // Update the state.
    items.setIodOutputSubdomain(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }
  
  // Add a row (output)
  const addRowsOutput = () => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = items.iodOutputSubdomain;

    // Push the new row.
    dummy.push({
      "mediatype": "",
      "uri": {
        "filename": "",
        "uri": "",
        "access_time": "",
        "sha1_checksum": ""
      }
    });

    // Update the state.
    items.setIodOutputSubdomain(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row (output)
  const removeRowsOutput = (which) => {

    // Get the state variable.
    var dummy = items.iodOutputSubdomain;

    // Remove the index.
    dummy.splice(which, 1);

    // Update the state.
    items.setIodOutputSubdomain(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Arguments
  // ---------
  // items: JSON object (IO Domain)


  // ----- Meta Information ----- //
  

  // ----- None ----- //

  return(
    <Table size="small">
    <TableHead className={classes.tabled}>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography className={missingIoDomain ? classes.missingHeader : classes.header} variant="h1">
            IO Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <StyledCell colSpan="5">
          <Typography className={missingInputSubdomain ? classes.missingHeader : classes.header} variant="h3">
            Input Subdomain
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography>
            Filename
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography className={missingInputSubdomainUri ? classes.missingHeader : classes.header}>
            URI
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
            Access Time
          </Typography>
        </StyledCell>
        <StyledCell colSpan="3">
          <Typography>
            SHA1 Checksum
          </Typography>
        </StyledCell>
      </TableRow>
      {
        items.iodInputSubdomain.map((item, index) => (
            <TableRow>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} value={cF(item.uri.filename)} variant="outlined" onChange={(e) => setInputInput(e, index, 'filename')} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} error={cF(item.uri.uri) === "" ? true : false} value={cF(item.uri.uri)} variant="outlined" onChange={(e) => setInputInput(e, index, 'uri')} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(item.uri.access_time)} onChange={(e) => setInputInput(e, index, 'access_time')} variant="outlined" />
              </StyledCell>
              <StyledCell colSpan="2">
                <TextField InputProps={{ className: classes.root }} value={cF(item.uri.sha1_checksum)} variant="outlined" onChange={(e) => setInputInput(e, index, 'sha1_checksum')} fullWidth />
              </StyledCell>
              <StyledCell>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRowsInput(index)}>
                  Remove
                </Button>
              </StyledCell>
            </TableRow>
          )
        )
      }
      <TableRow>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRowsInput()}>
              Add Input Subdomain
            </Button>
          </StyledCell>
        </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography className={missingOutputSubdomain ? classes.missingHeader : classes.header} variant="h3">
            Output Subdomain
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography className={missingOutputSubdomainMediatype ? classes.missingHeader : classes.header} variant="h3">
            Media Type
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
            Filename
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography className={missingOutputSubdomainUri ? classes.missingHeader : classes.header}>
            URI
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
            Access Time
          </Typography>
        </StyledCell>
        <StyledCell colSpan="2">
          <Typography>
            SHA1 Checksum
          </Typography>
        </StyledCell>
      </TableRow>
      {
        items.iodOutputSubdomain.map((item, index) => (
            <TableRow>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} error={cF(item.mediatype) === "" ? true : false} value={cF(item.mediatype)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'mediatype', true)} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} value={cF(item.uri.filename)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'filename')} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} error={cF(item.uri.uri) === "" ? true : false} value={cF(item.uri.uri)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'uri')} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(item.uri.access_time)} onChange={(e) => setInputOutput(e, index, 'access_time')} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} value={cF(item.uri.sha1_checksum)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'sha1_checksum')} />
              </StyledCell>
              <StyledCell>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRowsOutput(index)}>
                  Remove
                </Button>
              </StyledCell>
            </TableRow>
          )
        )
      }
      <TableRow>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRowsOutput()}>
              Add Output Subdomain
            </Button>
          </StyledCell>
        </TableRow>
    </TableBody>
  </Table>
  );
}
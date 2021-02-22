import React from 'react';
import {
  withStyles, Typography
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
  
  const classes = withStyles();

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
          <Typography variant="h3">
            IO Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <StyledCell colSpan="5">
          <Typography>
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
          <Typography>
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
                <TextField value={cF(item.uri.filename)} variant="outlined" onChange={(e) => setInputInput(e, index, 'filename')} />
              </StyledCell>
              <StyledCell>
                <TextField value={cF(item.uri.uri)} variant="outlined" onChange={(e) => setInputInput(e, index, 'uri')} />
              </StyledCell>
              <StyledCell>
                <TextField value={cF(item.uri.access_time)} variant="outlined" onChange={(e) => setInputInput(e, index, 'access_time')} />
              </StyledCell>
              <StyledCell colSpan="2">
                <TextField value={cF(item.uri.sha1_checksum)} variant="outlined" onChange={(e) => setInputInput(e, index, 'sha1_checksum')} fullWidth />
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
          <StyledCell colSpan="6">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRowsInput()}>
              Add Input Subdomain
            </Button>
          </StyledCell>
        </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography>
            Output Subdomain
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography>
            Media Type
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
            Filename
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
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
                <TextField value={cF(item.mediatype)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'mediatype', true)} />
              </StyledCell>
              <StyledCell>
                <TextField value={cF(item.uri.filename)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'filename')} />
              </StyledCell>
              <StyledCell>
                <TextField value={cF(item.uri.uri)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'uri')} />
              </StyledCell>
              <StyledCell>
                <TextField value={cF(item.uri.access_time)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'access_time')} />
              </StyledCell>
              <StyledCell>
                <TextField value={cF(item.uri.sha1_checksum)} variant="outlined" onChange={(e) => setInputOutput(e, index, 'sha1_checksum')} />
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
          <StyledCell colSpan="6">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRowsOutput()}>
              Add Output Subdomain
            </Button>
          </StyledCell>
        </TableRow>
    </TableBody>
  </Table>
  );
}
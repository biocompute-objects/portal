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

// Add environment variable
import Button from '@material-ui/core/Button'

//import { TextInput } from 'react-native';

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// A function to process a key.
const processKey = (ikey) => {
  
  // Define the returnable variable.
  var returnable = '';
  
  // Split on the underscore, then capitalize.
  const splitUp = ikey.split('_');

  // Only process if we have anything.
  if(splitUp.length > 1) {

    // Join and return.
    var capJoined = [];

    splitUp.map(value => {
      if(value === 'id') {
        capJoined.push('ID')
      } else if(value === 'io') {
        capJoined.push('IO')
      } else {
        capJoined.push(value.charAt(0).toUpperCase() + value.slice(1));
      }
    });

    // Kick it back.
    returnable = capJoined.join(' ')

  } else {
    if(ikey === 'etag') {
      returnable = 'eTag';
    } else if(ikey === 'url') {
      returnable = 'URL';
    } else if(ikey === 'uri') {
      returnable = 'URI'
    } else if(ikey === 'email') {
      returnable = 'eMail'
    } else if(ikey === 'orcid') {
      returnable = 'ORCID'
    } else {
      returnable = ikey.charAt(0).toUpperCase() + ikey.slice(1);
    }
  }

  // Kick it back.
  return(returnable)

}

// Pass an object and whether or not its keys are properties.
export default function ExecutionDomain({ items, cF }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Execution Domain)


  // ----- Meta Information ----- //
  

  // ----- None ----- //

  return(
    <div>
    <Table size="small">
    <TableHead className={classes.tabled}>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography variant="h3">
            Execution Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <StyledCell>
          <Typography>
            Script
          </Typography>
        </StyledCell>
        <StyledCell colSpan="5">
          <TextField defaultValue={items.script} variant="outlined" />
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography>
            Script Driver
          </Typography>
        </StyledCell>
        <StyledCell colSpan="5">
          <TextField variant="outlined"></TextField>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography>
            Software Prerequisites
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        {
          ['Name', 'Version', 'Filename', 'URI', 'Access Time', 'SHA1 Checksum'].map(item => (
              <StyledCell>
                <Typography>
                  {item}
                </Typography>
              </StyledCell>
            )
          )
        }
      </TableRow>
      <TableRow>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Button variant="contained" color="primary" disableElevation fullWidth>
            Add Software Prerequisite
          </Button>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography>
            External Data Endpoints
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
      <StyledCell>
        <Typography>
          Name
        </Typography>
      </StyledCell>
      <StyledCell colSpan="5">
        <Typography>
          URL
        </Typography>
      </StyledCell>
      </TableRow>
      <TableRow>
      <StyledCell>
        <TextField variant="outlined"></TextField>
      </StyledCell>
      <StyledCell colSpan="5">
        <TextField variant="outlined"></TextField>
      </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Button variant="contained" color="primary" disableElevation fullWidth>
            Add External Data Endpoint
          </Button>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography>
            Environment Variables
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography>
            Key
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
            Value
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Button variant="contained" color="primary" disableElevation fullWidth>
            Add Environment Variable
          </Button>
        </StyledCell>
      </TableRow>
    </TableBody>
  </Table>
  </div>
  );
}
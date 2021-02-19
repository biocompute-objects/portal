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
        <StyledCell colSpan="2">
          <Typography>
            SHA1 Checksum
          </Typography>
        </StyledCell>
      </TableRow>
      {
        items.input_subdomain.map(item => (
            <TableRow>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.filename)} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.uri)} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.access_time)} variant="outlined" />
              </StyledCell>
              <StyledCell colSpan="2">
                <TextField defaultValue={cF(item.uri.sha1_checksum)} variant="outlined" />
              </StyledCell>
            </TableRow>
          )
        )
      }
      <TableRow>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth>
              Add Record
            </Button>
          </StyledCell>
        </TableRow>
      <TableRow>
        <StyledCell colSpan="5">
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
        <StyledCell>
          <Typography>
            SHA1 Checksum
          </Typography>
        </StyledCell>
      </TableRow>
      {
        items.output_subdomain.map(item => (
            <TableRow>
              <StyledCell>
                <TextField defaultValue={cF(item.mediatype)} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.filename)} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.uri)} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.access_time)} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField defaultValue={cF(item.uri.sha1_checksum)} variant="outlined" />
              </StyledCell>
            </TableRow>
          )
        )
      }
      <TableRow>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth>
              Add Record
            </Button>
          </StyledCell>
        </TableRow>
    </TableBody>
  </Table>
  );
}
import React from 'react';
import {
  withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// For links.
import Linker from './components/Linker';

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
export default function IoDomain({ items }) {

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
        {
          ['Filename', 'URI', 'Access Time', 'SHA1 Checksum'].map(item => (
              item === 'SHA1 Checksum'
                ?
                  <StyledCell colSpan="2">
                    <Typography>
                      {item}
                    </Typography>
                  </StyledCell>
                :
                  <StyledCell>
                    <Typography>
                      {item}
                    </Typography>
                  </StyledCell>
            )
          )
        }
      </TableRow>
      {
        items.input_subdomain.map(item => (
            <TableRow>
              {
                ['filename', 'uri', 'access_time', 'sha1_checksum'].map(subitem => (
                    subitem === 'sha1_checksum'
                      ?
                        subitem in item.uri
                          ?
                            <StyledCell colSpan="2">
                              <Linker color= { 'whiteLink' } uri={ item.uri[subitem] } />
                            </StyledCell>
                          :
                            <StyledCell colSpan="2">None</StyledCell>
                      :                      
                        subitem in item.uri
                          ?
                            subitem === 'uri'
                              ?
                                <StyledCell>
                                  <Linker color= { 'whiteLink' } uri={ item.uri[subitem] } />
                                </StyledCell>
                              :
                                <StyledCell>{item.uri[subitem]}</StyledCell>
                          :
                            <StyledCell>None</StyledCell>
                  )
                )
              }
            </TableRow>
          )
        )
      }
      <TableRow>
        <StyledCell colSpan="5">
          <Typography>
            Output Subdomain
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        {
          ['Media Type', 'Filename', 'URI', 'Access Time', 'SHA1 Checksum'].map(item => (
              <StyledCell>
                <Typography>
                  {item}
                </Typography>
              </StyledCell>
            )
          )
        }
      </TableRow>
      {
        items.output_subdomain.map(item => (
            <TableRow>
              <StyledCell>{item.mediatype}</StyledCell>
              {
                ['filename', 'uri', 'access_time', 'sha1_checksum'].map(subitem => (
                    subitem in item.uri
                    ?
                      subitem === 'uri'
                        ?
                          <StyledCell>
                            <Linker color= { 'whiteLink' } uri={ item.uri[subitem] } />
                          </StyledCell>
                        :
                          <StyledCell>{item.uri[subitem]}</StyledCell>
                    :
                      <StyledCell>None</StyledCell>
                  )
                )
              }
            </TableRow>
          )
        )
      }
    </TableBody>
  </Table>
  );
}
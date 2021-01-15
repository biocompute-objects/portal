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

// For contact information.
import Tooltip from '@material-ui/core/Tooltip';

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
      if(value == 'id') {
        capJoined.push('ID')
      } else if(value == 'io') {
        capJoined.push('IO')
      } else {
        capJoined.push(value.charAt(0).toUpperCase() + value.slice(1));
      }
    });

    // Kick it back.
    returnable = capJoined.join(' ')

  } else {
    if(ikey == 'etag') {
      returnable = 'eTag';
    } else if(ikey == 'url') {
      returnable = 'URL';
    } else if(ikey == 'uri') {
      returnable = 'URI'
    } else if(ikey == 'email') {
      returnable = 'eMail'
    } else if(ikey == 'orcid') {
      returnable = 'ORCID'
    } else {
      returnable = ikey.charAt(0).toUpperCase() + ikey.slice(1);
    }
  }

  // Kick it back.
  return(returnable)

}

// Pass an object and whether or not its keys are properties.
export default function ExecutionDomain({ items }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Execution Domain)


  // ----- Meta Information ----- //
  

  // ----- None ----- //

  return(
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
      {
        items.script.map((item, index) => (
            index == 0
              ?
                <TableRow>
                  <StyledCell rowSpan={items.script.length}>
                    <Typography>
                      Script
                    </Typography>
                  </StyledCell>
                  <StyledCell colSpan="5">
                    <Linker color= { 'whiteLink' } uri={ item.uri.uri } />
                  </StyledCell>
                </TableRow>
              :
              <TableRow>
                <StyledCell colSpan="5">
                  <Linker color= { 'whiteLink' } uri={ item.uri.uri } />
                </StyledCell>
              </TableRow>
          )
        )
      }
      <TableRow>
        <StyledCell>
          <Typography>
            Script Driver
          </Typography>
        </StyledCell>
        <StyledCell colSpan="5">
          {items.script_driver}
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
      {
        items.software_prerequisites.map(item => (
            <TableRow>
              <StyledCell>{item.name}</StyledCell>
              <StyledCell>{item.version}</StyledCell>
              {
                ['filename', 'uri', 'access_time', 'sha1_checksum'].map(subitem => (
                    subitem in item.uri
                      ?
                        subitem == 'uri'
                          ?
                            <StyledCell>
                              <Linker color= { 'whiteLink' } uri={ item.uri.uri } />
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
        <StyledCell colSpan="6">
          <Typography>
            External Data Endpoints
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        {
          ['Name', 'URL'].map(item => (
              item == 'Name'
                ?
                  <StyledCell>
                    <Typography>
                      {item}
                    </Typography>
                  </StyledCell>
                :
                  <StyledCell colSpan="5">
                    <Typography>
                      {item}
                    </Typography>
                  </StyledCell>
            )
          )
        }
      </TableRow>
      {
        items.external_data_endpoints.map(item => (
                <TableRow>
                  <StyledCell>
                    {item.name}
                  </StyledCell>
                  <StyledCell colSpan="5">
                    <Linker color= { 'whiteLink' } uri={ item.url } />
                  </StyledCell>
                </TableRow>
              )
          )
      }
      <TableRow>
        <StyledCell colSpan="6">
          <Typography>
            Environment Variables
          </Typography>
        </StyledCell>
      </TableRow>
      {
        Object.keys(items.environment_variables).map(item => (
              <TableRow>
                <StyledCell>{item}</StyledCell>
                <StyledCell colSpan="5">{items.environment_variables[item]}</StyledCell>
              </TableRow>
              )
          )
      }
    </TableBody>
  </Table>
  );
}
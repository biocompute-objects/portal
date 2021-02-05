import React from 'react';
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

// SVG/Link styling
const useStyles = makeStyles((theme) => ({
  linked: {
    color: '#ffffff'
  },
  translated: {
    WebkitTransform: 'translateY(7px)'
  }
}));

// Pass an object and whether or not its keys are properties.
export default function Meta() {  
  
  const classes = withStyles();
  const svgClasses = useStyles();

  // Arguments
  // ---------
  // items: JSON object (Meta Information)


  // ----- Meta Information ----- //

  
  // None.


  // ----- Meta ----- //

  return(
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h3">
              Object Information
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledCell>
            Object ID
          </StyledCell>
          <StyledCell>
            <TextField disabled id="outlined-basic" label="Object ID" variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            Spec Version
          </StyledCell>
          <StyledCell>
            <Linker color={ 'whiteLink' } uri={ 'https://opensource.ieee.org/2791-object/ieee-2791-schema/' } />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            eTag
          </StyledCell>
          <StyledCell>
            <TextField disabled id="outlined-basic" label="eTag" variant="outlined" />
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
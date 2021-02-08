import React from 'react';
import {
  withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RecursiveRows from './RecursiveRows'

// Cell styling
const StyledCell = withStyles({
  bordered: {
    border: '1px solid black'
  },
  marginHolder: {
    marginLeft: '10px'
  },
  root: {
    color: 'white'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function ErrorDomain({ items }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Error Domain)


  // ----- Meta Information ----- //
  

  // ----- None ----- //
  return (
    <div>
      <Table size="small">
        <TableHead className={classes.tabled}>
          <TableRow>
            <StyledCell colSpan="5">
              <Typography variant="h3">
                Error Domain
              </Typography>
            </StyledCell>
          </TableRow>
        </TableHead>
      </Table>
      <div className={classes.bordered}>
        <RecursiveRows items={items}/>
      </div>
    </div>
  );
}
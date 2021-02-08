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

// Add contributor
import Button from '@material-ui/core/Button'

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
export default function ParametricDomain({ items }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Parametric Domain)


  // ----- Meta Information ----- //
  

  // ----- None ----- //

  return(
    <div>
    <Table size="small">
    <TableHead className={classes.tabled}>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography variant="h3">
            Parametric Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        {
          ['Step', 'Parameter', 'Value'].map(item => (
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
      </TableRow>
      <TableRow>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth>
              Add Parameter
            </Button>
          </StyledCell>
        </TableRow>
    </TableBody>
  </Table>
  </div>
  );
}
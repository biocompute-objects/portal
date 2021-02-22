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
export default function ParametricDomain({ items, cF }) {
  
  const classes = withStyles();

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based 
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInput = (event, i, inputName) => {
    
    // Get the state variable.
    var dummy = items.pad;

    // Change the value at the given index.
    dummy[i][inputName] = event.target.value;

    // Update the state.
    items.setPad(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }
  
  // Add a row
  const addRows = () => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = items.pad;

    // Push the new row.
    dummy.push({
      "step": "",
      "parameter": "",
      "value": ""
    });

    // Update the state.
    items.setPad(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row
  const removeRows = (which) => {

    // Get the state variable.
    var dummy = items.pad;

    // Remove the index.
    dummy.splice(which, 1);

    // Update the state.
    items.setPad(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

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
              item === 'Value'
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
        items.pad.map((item, index) => (
            <TableRow>
              {
                ['step', 'param', 'value', 'remove'].map(subitem=> (
                    subitem !== 'remove'
                      ?
                        <StyledCell>
                          <TextField  value={cF(item[subitem])} onChange={(e) => setInput(e, index, subitem)} variant="outlined" />
                        </StyledCell>
                      :
                        <StyledCell>
                            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows(index)}>
                              Remove
                            </Button>
                        </StyledCell>
                  )
                )
              }
            </TableRow>
          )
        )
      }
      <TableRow>
        <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows()}>
              Add Parameter
            </Button>
          </StyledCell>
        </TableRow>
    </TableBody>
  </Table>
  </div>
  );
}
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

// Add contributor
import Button from '@material-ui/core/Button'

// Section cell styling
const useStyles = makeStyles((theme) => ({
  header: {
    color: 'white'
  },
  missingHeader: {
    color: 'red'
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
export default function ParametricDomain({ items, cF }) {
  
  const classes = useStyles();

  // State for showing missing sections.
  // TODO: For some reason didn't work with [items.pad]

  // State for showing missing sections.
  const [missingParametricDomain, setMissingParametricDomain] = useState(true);
  const [missingStep, setMissingStep] = useState(false);
  const [missingParameter, setMissingParameter] = useState(false);
  const [missingValue, setMissingValue] = useState(false);

  useEffect(() => {
    
    // Create an OR flag.
    var orFlag = false;

    // Description (note that Parametric Domain is not a necessary domain
    // in IEEE-2791).
    if(items.pad.length == 0) {

      // No Parametric Domain.
      setMissingParametricDomain(false);

      // No sub-fields.
      setMissingStep(false);
      setMissingParameter(false);
      setMissingValue(false);

    } else {

      // If there is a Parametric Domain, we have to consider
      // the necessary subfields.

      // Each field must be treated independently so that
      // our state is compared only to the relevant field.

      // Assume the header is not red.
      setMissingParametricDomain(false);

      // Each one of the steps.
      for(var i = 0; i < items.pad.length; i++) {

        // Step
        if(items.pad[i].step === "") {
          
          // No step.
          setMissingStep(true);

          // Header
          setMissingParametricDomain(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingParametricDomain(false);
        }

        // Can't rely on orFlag here.
        
      }
      
      // Each one of the parameters.
      for(var i = 0; i < items.pad.length; i++) {

        // Step
        if(items.pad[i].param === "") {
          
          // No parameter.
          setMissingParameter(true);

          // Header
          setMissingParametricDomain(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingParametricDomain(false);
        }

        // Can't rely on orFlag here.
        
      }
      
      // Each one of the values.
      for(var i = 0; i < items.pad.length; i++) {

        // Step
        if(items.pad[i].value === "") {
          
          // No step.
          setMissingValue(true);

          // Header
          setMissingParametricDomain(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingParametricDomain(false);
        }

        // Can't rely on orFlag here.
        
      }
      
    }

    // Was one OR the other missing in the Parametric Domain?
    if(orFlag) {
      setMissingParametricDomain(true);
    } else {

      // All required fields are ok.
      setMissingStep(false);
      setMissingParameter(false);
      setMissingValue(false);
      
      setMissingParametricDomain(false);

    }

  }, [items]);

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
      "param": "",
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
          <Typography className={missingParametricDomain ? classes.missingHeader : classes.header} variant="h1">
            Parametric Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
      <StyledCell>
        <Typography className={missingStep ? classes.missingHeader : classes.header} variant="h3">
          Step
        </Typography>
      </StyledCell>
      <StyledCell>
        <Typography className={missingParameter ? classes.missingHeader : classes.header} variant="h3">
          Parameter
        </Typography>
      </StyledCell>
      <StyledCell colSpan="2">
        <Typography className={missingValue ? classes.missingHeader : classes.header} variant="h3">
          Value
        </Typography>
      </StyledCell>
      </TableRow>
      {
        items.pad.map((item, index) => (
            <TableRow>
              <StyledCell>
                <TextField error={cF(item.step) === "" ? true : false} value={cF(item.step)} onChange={(e) => setInput(e, index, 'step')} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField error={cF(item.param) === "" ? true : false} value={cF(item.param)} onChange={(e) => setInput(e, index, 'param')} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <TextField error={cF(item.value) === "" ? true : false} value={cF(item.value)} onChange={(e) => setInput(e, index, 'value')} variant="outlined" />
              </StyledCell>
              <StyledCell>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows(index)}>
                  Remove
                </Button>
              </StyledCell>
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
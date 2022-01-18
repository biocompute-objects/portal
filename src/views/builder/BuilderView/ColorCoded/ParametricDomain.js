// /src/views/builder/BuilderView/ColorCoded/ParametricDomain.js

import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';

// Inputs
import TextField from '@material-ui/core/TextField';

// Add contributor
import Button from '@material-ui/core/Button';

// Section cell styling
const useStyles = makeStyles(() => ({
  header: {
    color: 'black'
  },
  missingHeader: {
    color: 'red'
  },
  root: {
    color: 'black'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
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
    let orFlag = false;

    // Description (note that Parametric Domain is not a necessary domain
    // in IEEE-2791).
    if (!items.pad) {
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
      for (var i = 0; i < items.pad.length; i++) {
        // Step
        if (items.pad[i].step === '') {
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
      for (i = 0; i < items.pad.length; i++) {
        // Step
        if (items.pad[i].param === '') {
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
      for (i = 0; i < items.pad.length; i++) {
        // Step
        if (items.pad[i].value === '') {
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
    if (orFlag) {
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
    const dummy = items.pad;

    // Change the value at the given index.
    dummy[i][inputName] = event.target.value;

    // Update the state.
    items.setPad(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender + 1);
  };

  // Add a row
  const addRows = () => {
    if (!items.pad) {
      const dummy = [];
      dummy.push({
        step: '',
        param: '',
        value: ''
      });
      items.setPad(dummy);
    } else {
      const dummy = items.pad;
      dummy.push({
        step: '',
        param: '',
        value: ''
      });
      items.setPad(dummy);
    }

    // Needed to re-render the page.
    items.setRerender(items.rerender + 1);
  };

  // Remove a row
  const removeRows = (which) => {
    // Get the state variable.
    const dummy = items.pad;

    // Remove the index.
    dummy.splice(which, 1);

    // Update the state.
    items.setPad(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender + 1);
  };

  return (
    <div>
      <Table size="small">
        <TableHead className={classes.tabled}>
          <TableRow>
            <StyledCell colSpan="6">
              <Button
                variant="contained"
                // color="D5D8DC"
                fullWidth
                onClick={() => window.open('https://docs.biocomputeobject.org/parametric-domain/')}
              >
                <Typography className={missingParametricDomain ? classes.missingHeader : classes.header} variant="h1">
                  Parametric Domain &nbsp;
                  <HelpIcon />
                </Typography>
              </Button>
            </StyledCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledCell>
              <Typography className={missingStep ? classes.missingHeader : classes.header} >
                Step
              </Typography>
            </StyledCell>
            <StyledCell>
              <Typography className={missingParameter ? classes.missingHeader : classes.header} >
                Parameter
              </Typography>
            </StyledCell>
            <StyledCell colSpan="2">
              <Typography className={missingValue ? classes.missingHeader : classes.header} >
                Value
              </Typography>
            </StyledCell>
          </TableRow>
          {(!items.pad)
            ? (
              <TableRow />
            )
            : (
              items.pad.map((item, index) => (

                <TableRow key={index.toString()}>
                  <StyledCell>
                    <TextField InputProps={{ className: classes.root }} error={cF(item.step) === ''} value={cF(item.step)} onChange={(e) => setInput(e, index, 'step')} variant="outlined" />
                  </StyledCell>
                  <StyledCell>
                    <TextField InputProps={{ className: classes.root }} error={cF(item.param) === ''} value={cF(item.param)} onChange={(e) => setInput(e, index, 'param')} variant="outlined" />
                  </StyledCell>
                  <StyledCell>
                    <TextField InputProps={{ className: classes.root }} error={cF(item.value) === ''} value={cF(item.value)} onChange={(e) => setInput(e, index, 'value')} variant="outlined" />
                  </StyledCell>
                  <StyledCell>
                    <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows(index)}>
                      Remove
                    </Button>
                  </StyledCell>
                </TableRow>
              ))
            )}
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

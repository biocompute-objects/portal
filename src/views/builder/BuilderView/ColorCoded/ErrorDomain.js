//  src/views/builder/BuilderView/ColorCoded/ErrorDomain.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  withStyles,
  Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';
import JsonView from 'src/components/JsonView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
export default function ErrorDomain({ items }) {
  const classes = withStyles();
  const [algorithmic, setAlgorithmic] = useState(items.errd ? items.errd.algorithmic_error : {});
  const [empirical, setEmpirical] = useState(items.errd ? items.errd.empirical_error : {});
  const [updates, setUpdates] = useState(false);

  const addErrors = () => {
    console.log('working click', setAlgorithmic);
    setUpdates(true);
  };

  useEffect(() => {
    if (updates === true) {
      items.setErrd(
        {
          empirical_error: empirical,
          algorithmic_error: algorithmic
        }
      );
    }
  }, [empirical, algorithmic, updates]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading} variant="h3">
          Error Domain
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableHead className={classes.tabled}>
            <TableRow>
              <StyledCell colSpan="6">
                <Button
                  variant="contained"
                  onClick={() => window.open('https://docs.biocomputeobject.org/error-domain/')}
                >
                  <Typography>
                    <HelpIcon />
                  </Typography>
                </Button>
              </StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            (!items.errd)
              ? (
                <TableRow>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    onClick={() => addErrors()}
                  >
                    Add Error Domain
                  </Button>
                </TableRow>
              )
              : (
                <TableRow>
                  <JsonView
                    jsonContents={algorithmic}
                    setJsonContents={setAlgorithmic}
                    header="Algorithmic Error Subdomain"
                    rows={4}
                  />
                  <JsonView
                    jsonContents={empirical}
                    setJsonContents={setEmpirical}
                    header="Empirical Error Subdomain"
                    rows={4}
                  />
                </TableRow>
              )
        }
          </TableBody>
        </Table>
      </AccordionDetails>

    </Accordion>
  );
}

ErrorDomain.propTypes = {
  items: PropTypes.any.isRequired
};

// src/views/builder/BuilderView/ColorCoded/Meta.js

import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  withStyles,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import hash from 'object-hash';

// For links.
import Linker from './components/Linker';

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
export default function Meta({ items }) {
  const classes = withStyles();
  const makeETag = () => {
    const hashContents = { ...items.objectContents };
    delete hashContents.object_id;
    delete hashContents.spec_version;
    delete hashContents.etag;
    const etag = hash(hashContents);
    items.setMeEtag(etag);
    items.setRerender(items.rerender + 1);
    items.setMeEtagSet(false);
  };

  useEffect(() => {
    if (items.meEtagSet) {
      makeETag();
      items.setMeEtagSet(false);
    }
  }, [items.meEtagSet]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading} variant="h3">
          Object Information (click to expand)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableBody>
            <TableRow>
              <Button
                variant="contained"
                onClick={() => window.open('https://docs.biocomputeobject.org/top-level/')}
              >
                <HelpIcon />
              </Button>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Typography variant="h3">
                  Object ID
                </Typography>
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} disabled label={items.meObjectId} fullWidth id="outlined-basic" variant="outlined" />
              </StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Typography variant="h3">
                  Spec Version
                </Typography>
              </StyledCell>
              <StyledCell>
                <Linker color="blackLink" uri="https://opensource.ieee.org/2791-object/ieee-2791-schema/" />
              </StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell>
                <Typography variant="h3">
                  eTag
                </Typography>
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} disabled label={items.meEtag} fullWidth id="outlined-basic" variant="outlined" />
              </StyledCell>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                onClick={() => makeETag()}
              >
                Generate eTag
              </Button>
            </TableRow>
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
}

Meta.propTypes = {
  items: PropTypes.object.isRequired
};

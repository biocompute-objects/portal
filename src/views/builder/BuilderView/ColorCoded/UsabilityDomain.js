import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Multiline Input
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';

// Section cell and other styling
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    color: 'black'
  },
  header: {
    color: 'black'
  },
  missingHeader: {
    color: 'red'
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
export default function UsabilityDomain({ items, cF }) {
  const classes = useStyles();

  // State for showing missing sections.
  const [missingUsabilityDomain, setMissingUsabilityDomain] = useState(false);

  // TODO: For some reason didn't work with [items.ud]

  useEffect(() => {
    if (items.ud[0] === '') {
      setMissingUsabilityDomain(true);
    } else {
      setMissingUsabilityDomain(false);
    }
  }, [items]);

  // Arguments
  // ---------
  // items: JSON object (Usability Domain)

  // ----- Meta Information ----- //

  // None.

  // ----- Usability ----- //

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <Button
              variant="contained"
              color="D5D8DC"
              fullWidth
              onClick={() => window.open('https://docs.biocomputeobject.org/usability-domain/')}
            >
              <Typography className={missingUsabilityDomain ? classes.missingHeader : classes.header} variant="h1">
                Usability Domain &nbsp;
                <HelpIcon />
              </Typography>
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledCell>
            <TextField
              InputProps={{ className: classes.root }}
              color="primary"
              error={cF(items.ud[0]) === ''}
              defaultValue={cF(items.ud)}
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              onChange={(e) => items.setUd([e.target.value])}
            />
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

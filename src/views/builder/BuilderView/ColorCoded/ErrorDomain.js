import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
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
export default function ErrorDomain({ items, cF }) {
  
  const classes = withStyles(), inputClasses = useStyles();

  // No state required to check for missing section because
  // error domain is optional in IEEE 2791.

  // Arguments
  // ---------
  // items: JSON object (Error Domain)


  // ----- Meta Information ----- //

  
  // None.
  console.log('=++++++++++++++++', items)
  console.log(cF(items))


  // ----- Error ----- //

  return(
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
      <TableBody>
        <TableRow>
          <StyledCell>
            <TextField
              color="primary"
              defaultValue={JSON.stringify(cF(items.errd), null, 4)}
              fullWidth
              id="outlined-multiline-static"
              multiline
              onChange={(e) => items.setErrd([e.target.value])}
              rows={8}
              variant="outlined"
            />
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
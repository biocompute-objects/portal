// /src/views/builder/BuilderView/ColorCoded/HelpBar.js

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
  bordered: {
    border: '2px solid black'
  },
  missingHeader: {
    color: 'red',
    text: 'red'
  },
  missingHeaderOptional: {
    color: 'yellow'
  },
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function HelpBar({ items }) {
  const classes = withStyles();

  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <StyledCell className={classes.missingHeader}>
            <Typography style={{ color: 'red' }} variant="h3">
              Red Boxes are Required Fields
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography style={{ color: 'yellow' }} variant="h3">
              Yellow Boxes are Reccomended Fields
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography variant="h3">
              Plain Boxes are Optional Fields
            </Typography>
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

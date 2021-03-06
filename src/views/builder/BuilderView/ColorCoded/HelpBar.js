// /src/views/builder/BuilderView/ColorCoded/HelpBar.js

import React from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// Cell styling
const StyledCell = withStyles({
  // bordered: {
  //   border: '2px solid black'
  // },
  // missingHeader: {
  //   color: 'red',
  //   text: 'red'
  // },
  // missingHeaderOptional: {
  //   color: 'yellow'
  // },
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function HelpBar({ items }) {
  const classes = withStyles();

  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <StyledCell className={classes.missingHeader}>
            <Typography component="span" style={{ color: 'red' }} variant="h3">
              Red Boxes are Required Fields
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography component="span" style={{ color: '#D7BC1E' }} variant="h3">
              Yellow Boxes are Recommended Fields
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography component="span" variant="h3">
              Plain Boxes are Optional Fields
            </Typography>
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

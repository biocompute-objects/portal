// src/views/builder/BuilderView/Raw/index.js

import React, { useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// JSON errors
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// There is a problem with the parser returning HTML strings,
// so convert.
// Source: https://stackoverflow.com/a/55884366/5029459
import ReactHtmlParser from 'react-html-parser';

// Fetch context.
import ReactJson from 'react-json-view';
// import { FetchContext } from '../../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  errors: {
    backgroundColor: 'red'
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

// Pass an object and whether its keys are properties.
export default function Raw(items) {
  // As of 5/13/21, there is no relationship between the color-coded
  // draft view and the raw draft view.
  const [contents, setContents] = useState(items.objectContents);
  const classes = useStyles();
  const [jsonErrors, setJsonErrors] = useState('');

  const { onAdd, onEdit, onDelete } = useState();
  const handleChange = (event) => {
    console.log(items);
    console.log('event.updated_src', event.updated_src);
    items.setObjectContents(event.updated_src);
  };

  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h3">
              Raw JSON
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledCell>
            <ReactJson
              src={contents}
              onEdit={handleChange}
              onDelete={handleChange}
              onAdd={handleChange}
            />
          </StyledCell>
        </TableRow>
        <TableRow>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={jsonErrors !== '' ? classes.errors : classes.pass} variant="h5" component="h2">
                { ReactHtmlParser(jsonErrors) }
              </Typography>
            </CardContent>
          </Card>
        </TableRow>
      </TableBody>
    </Table>
  );
}

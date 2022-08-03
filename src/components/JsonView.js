// src/views/builder/BuilderView/JsonView.js
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

// Checking for field value existence

// JSON errors
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// There is a problem with the parser returning HTML strings,
// so convert.
// Source: https://stackoverflow.com/a/55884366/5029459
import ReactHtmlParser from 'react-html-parser';

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
  // bordered: {
  //   border: '1px solid black'
  // }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function JsonView({
  jsonContents, setJsonContents, header, rows
}) {
  const classes = useStyles();

  const rawContents = JSON.stringify(jsonContents, null, 4);
  const [jsonErrors, setJsonErrors] = useState('');
  const setInput = (value) => {
    let holder = {};
    try {
      holder = JSON.parse(value);
      setJsonErrors('');
    } catch (e) {
      setJsonErrors(e);
      console.log(jsonErrors);
    }
    setJsonContents(holder);
  };

  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography component="span" variant="h3">
              {header}
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={jsonErrors !== '' ? classes.errors : classes.pass} variant="h5" component="h2">
                { ReactHtmlParser(jsonErrors) }
              </Typography>
            </CardContent>
          </Card>
        </TableRow>
        <TableRow>
          <StyledCell>
            <TextField
              color="primary"
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={rows}
              defaultValue={rawContents}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
            />
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

JsonView.propTypes = {
  jsonContents: PropTypes.object.isRequired,
  setJsonContents: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
};

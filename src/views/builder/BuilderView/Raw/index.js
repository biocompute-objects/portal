// src/views/builder/BuilderView/Raw/index.js 

import React, { useContext, useEffect, useState } from 'react';
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
import cF from '../../../../utils/cF';

// JSON errors
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// There is a problem with the parser returning HTML strings,
// so convert.
// Source: https://stackoverflow.com/a/55884366/5029459
import ReactHtmlParser from 'react-html-parser';

// Fetch context.
import { FetchContext } from '../../../../App';

import ReactJson from 'react-json-view'

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

// Pass an object and whether or not its keys are properties.
export default function Raw({ }) {
  
  // As of 5/13/21, there is no relationship between the color-coded
  // draft view and the raw draft view.
  const [contents, setContents] = useState(JSON.parse(localStorage.getItem('bco')))
  console.log('typeof(contents): ', typeof(contents), contents);
  const classes = useStyles();
  const [jsonErrors, setJsonErrors] = useState('');
  // Fetch context.
  const fc = useContext(FetchContext);

  const { onAdd, onEdit, onDelete } = useState();
  const handleChange = (event) => {
    console.log('event.updated_src', JSON.stringify(event.updated_src));
	localStorage.setItem('bco', JSON.stringify(event.updated_src));
  };
  
  return(
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
            < ReactJson 
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
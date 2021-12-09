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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Form from '@rjsf/core';
import Linker from './components/Linker';

// Multiline Input

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    color: 'black'
  },
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
export default function ExtensionDomain({ items }) {
  const classes = withStyles();
  const schemaList = [];
  const [schema, setSchema] = useState([]);

  const submitSchema = (value) => {
    console.log('schema', value);
  };
  useEffect(() => {
    if (!items.exd) {
      console.log('No Extension');
    } else {
      for (let extensionIndex = 0; extensionIndex < items.exd.length; extensionIndex++) {
        const schemaURL = items.exd[extensionIndex].extension_schema;
        console.log('Extension schema', schema);
        fetch(schemaURL)
          .then((response) => response.json())
          .then((jsonData) => {
            schemaList.push(jsonData);
          })
          .catch((error) => {
          // handle your errors here
            console.error(error);
          });
      }
      setSchema(schemaList);
    }
  }, [items]);
  console.log('schema 69', schema);
  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Button
              variant="contained"
              color="D5D8DC"
              fullWidth
              onClick={() => window.open('https://docs.biocomputeobject.org/bco-domains/')}
            >
              <Typography variant="h3">
                Extension Domain&nbsp;
                <HelpIcon />
              </Typography>
            </Button>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(!items.exd)
          ? (<TableRow>{console.log('no items.exd')}</TableRow>)
          : (
            items.exd.map((item, index) => (
              <Card>
                <TableRow>
                  <StyledCell>
                    <Typography variant="h3">
                      Extension Schema
                    </Typography>
                  </StyledCell>
                  <StyledCell>
                    <Linker color="blackLink" uri={item.extension_schema} />
                  </StyledCell>
                </TableRow>
                <TableRow>
                  {(!schema)
                    ? <StyledCell />
                    : (
                      <StyledCell colspan={6}>
                        {console.log('schema 108', schema, schema.index)}
                        <TextField value={schema} />
                      </StyledCell>
                    )}
                </TableRow>
              </Card>
            ))
          )}
        <TableRow />
        <Card>
          <StyledCell>
            <TextField
              label="Extension Schema"
              margin="normal"
              name="Extension Schema"
              onChange={(e) => setSchema(e.target.value)}
              type="schema"
              value={schema}
              variant="outlined"
            />
          </StyledCell>
          <StyledCell>
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => submitSchema(schema)}>
              <Typography> Add Extension Schema </Typography>
            </Button>
          </StyledCell>
        </Card>
      </TableBody>
    </Table>
  );
}

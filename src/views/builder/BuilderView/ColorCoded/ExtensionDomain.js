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

  const submitSchema = (value) => {
    console.log('schema', value);
  };
  const setInput = (value, i) => {
    const holder = items.exd;
    holder[i] = JSON.parse(value);
    items.setExd(holder);
    console.log('working?', items.exd[i]);
  };

  const addRows = () => {
    console.log('add Rows', items);
    if (!items.exd) {
      const holder = [];
      holder.push({
        extension_schema: ''
      });
      items.setExd(holder);
    } else {
      const holder = items.exd;
      holder.push({
        extension_schema: ''
      })
      items.setExd(holder);
    }
    items.setRerender(items.rerender + 1);
  };

  const removeRows = (which) => {
    const holder = items.exd;
    holder.splice(which, 1);
    items.setExd(holder);
    items.setRerender(items.rerender + 1);
  };
  // useEffect(() => {
  //   if (!items.exd) {
  //     console.log('No Extension');
  //   } else {
  //     for (let extensionIndex = 0; extensionIndex < items.exd.length; extensionIndex++) {
  //       const schemaURL = items.exd[extensionIndex].extension_schema;
  //       console.log('Extension schema', schema);
  //       fetch(schemaURL)
  //         .then((response) => response.json())
  //         .then((jsonData) => {
  //           schemaList.push(jsonData);
  //           console.log(jsonData);
  //         })
  //         .catch((error) => {
  //         // handle your errors here
  //           console.error(error);
  //         });
  //     }
  //     setSchema(schemaList);
  //   }
  // }, [items.exd]);

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
              <Typography variant="h1">
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
            items.exd.map((item, index) => {
              return (
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
                    <StyledCell colspan={6}>
                      <TextField
                        color="primary"
                        fullWidth
                        name="extension_domain"
                        id="outlined-multiline-static"
                        multiline
                        rows={6}
                        defaultValue={JSON.stringify(item, null, 4)}
                        onChange={(e) => setInput(e.target.value, index)} // onChange={console.log('changed')}
                        variant="outlined"
                      />
                    </StyledCell>
                    <StyledCell>
                      <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows(index)}>
                        Remove
                      </Button>
                    </StyledCell>
                  </TableRow>
                </Card>
              );
            })
          )}
        <TableRow />
        <Card>
          <TableRow>
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows()}>
              Add Extension Schema
            </Button>
          </TableRow>
        </Card>
      </TableBody>
    </Table>
  );
}

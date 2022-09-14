// src/views/builder/BuilderView/ColorCoded/ExtensionDomain.js
import React from 'react';
import {
  withStyles, Typography, AccordionDetails,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

// Pass an object and whether its keys are properties.
export default function ExtensionDomain({ items }) {
  const classes = withStyles();

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
      });
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

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading} variant="h3">
          Extension Domain
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableBody>
            <TableRow>
              <Button
                variant="contained"
                onClick={() => window.open('https://docs.biocomputeobject.org/extension-domain/')}
              >
                <HelpIcon />
              </Button>
            </TableRow>
            <TableRow />
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
                            rows={8}
                            defaultValue={JSON.stringify(item, null, 4)}
                            onChange={(e) => setInput(e.target.value, index)}
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
      </AccordionDetails>
    </Accordion>
  );
}

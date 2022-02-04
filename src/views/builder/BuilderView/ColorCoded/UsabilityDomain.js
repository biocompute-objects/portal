import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Textfit } from 'react-textfit';

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
  const [newVal, setNewVal] = useState('');
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

  const removeRows = (index) => {
    const temp = items.ud;
    temp.splice(index, 1);
    console.log('temp', temp);
    items.setUd(temp);
    setNewVal('');
    items.setRerender(items.rerender + 1);
  };

  const addItem = () => {
    const temp = newVal;
    items.ud.push(newVal);
    setNewVal('6]5');
    console.log('items.ud', items.ud);
    items.setRerender(items.rerender + 1);
  };

  console.log('length.items.ud', newVal);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <Button
              variant="contained"
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
        {
           (!items.ud)
             ? (<TableRow />)
             : (items.ud.map((item, index) => (
               <TableRow>
                 <StyledCell>
                   <Textfit
                     mode="multi"
                     max="14"
                   >
                     {item}
                   </Textfit>
                 </StyledCell>
                 <StyledCell>
                   <Button
                     variant="contained"
                     color="primary"
                     disableElevation
                     onClick={() => removeRows(index)}
                   >
                     Remove
                   </Button>
                 </StyledCell>
               </TableRow>
             ))
             )
        }
        <TableRow>
          <StyledCell>
            <TextField
              InputProps={{ className: classes.root }}
              color="primary"
              fullWidth
              id="outlined-multiline-static"
              variant="outlined"
              onChange={(e) => setNewVal(e.target.value)}
              defaultValue={newVal}
            />
          </StyledCell>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addItem(newVal)}>
              Add Item
            </Button>
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

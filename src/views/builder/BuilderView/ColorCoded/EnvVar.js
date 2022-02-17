// src/views/builder/BiulderView/ColorCoded/EnvVar.js

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  makeStyles,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import { Textfit } from 'react-textfit';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
    textAlign: 'left'
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

export default function EnvVar({
  link, header, object, setObject, setRerender, rerender, fields
}) {
  const classes = useStyles();
  const [newVal, setNewVal] = useState('');
  const [newKey, setNewKey] = useState('');

//   console.log(
//     Object.keys(object).map((key) => { return `${key}: ${object[key]}`; })
//   );

  const removeItem = (key) => {
    delete object[key];
    setRerender(rerender + 1);
  };

  const addItem = () => {
    const temp = {
      ...object,
      [newKey]: newVal
    };
    setObject(temp);
    setNewVal('');
    setNewKey('');
    setRerender(rerender + 1);
  };

  return (
    <Card className={classes.linkCard}>
      <CardActionArea onClick={() => window.open(link)}>
        <CardContent className={classes.linkCard}>
          <Typography className={classes.title}>
            {header}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <TableBody>
          {
           (!object)
             ? (
               <TableRow>
                 {fields[0]}
                 {' '}
                 {fields[1]}
               </TableRow>
             )
             : (Object.keys(object).map((key, index) => (
               // eslint-disable-next-line react/no-array-index-key
               <TableRow key={index}>
                 <StyledCell>
                   <Textfit mode="multi" max={14}>
                     {`${key}: ${object[key]}`}
                   </Textfit>
                 </StyledCell>
                 <StyledCell>
                   <Button
                     variant="contained"
                     color="primary"
                     disableElevation
                     onClick={() => removeItem(key)}
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
                onChange={(e) => setNewKey(e.target.value)}
                value={newKey}
              />
            </StyledCell>
            <StyledCell>
              <TextField
                InputProps={{ className: classes.root }}
                color="primary"
                fullWidth
                id="outlined-multiline-static"
                variant="outlined"
                onChange={(e) => setNewVal(e.target.value)}
                value={newVal}
              />
            </StyledCell>
          </TableRow>
          <TableRow>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              onClick={addItem}
            >
              Add
            </Button>
          </TableRow>
        </TableBody>
      </CardContent>
    </Card>
  );
}

EnvVar.propTypes = {
  link: PropTypes.string.isRequired,
  header: PropTypes.string,
  object: PropTypes.array,
  setObject: PropTypes.func,
  setRerender: PropTypes.func,
  rerender: PropTypes.number,
  fields: PropTypes.array.isRequired,
};

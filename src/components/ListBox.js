// src/components/ListBox.js

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
import HelpIcon from '@material-ui/icons/Help';
import { Textfit } from 'react-textfit';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
    textAlign: 'center'
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

export default function ListBox({
  link, header, list, setList, setRerender, rerender
}) {
  const classes = useStyles();
  const [newVal, setNewVal] = useState('');

  useEffect(() => {
    if (typeof list === 'undefined') {
      setList([]);
    }
  }, [list]);

  const removeItem = (index) => {
    const temp = list;
    temp.splice(index, 1);
    setList(temp);
    setNewVal('');
    setRerender(rerender + 1);
  };

  const addItem = () => {
    const temp = newVal;
    console.log('ListBox', list);
    list.push(temp);
    setNewVal('');
    setRerender(rerender + 1);
  };

  return (
    <Card className={classes.linkCard}>
      {
        (link === 'noLink')
          ? (<CardActionArea />)
          : (
            <CardActionArea onClick={() => window.open(link)}>
              <CardContent className={classes.linkCard}>
                <Typography className={classes.title}>
                  {header}
                  <HelpIcon/>
                </Typography>
              </CardContent>
            </CardActionArea>
          )
        }
      <CardContent>
        <TableBody>
          {
           (!list)
             ? (<TableRow />)
             : (list.map((item, index) => (
               // eslint-disable-next-line react/no-array-index-key
               <TableRow key={index}>
                 <StyledCell>
                   <Textfit mode="multi" max={14}>
                     {item}
                   </Textfit>
                 </StyledCell>
                 <StyledCell>
                   <Button
                     variant="contained"
                     color="primary"
                     disableElevation
                     onClick={() => removeItem(index)}
                   >
                     -
                   </Button>
                 </StyledCell>
               </TableRow>
             ))
             )
        }
          <TableRow>
            <TextField
              InputProps={{ className: classes.root }}
              color="primary"
              fullWidth
              id="outlined-multiline-static"
              variant="outlined"
              onChange={(e) => setNewVal(e.target.value)}
              value={newVal}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              onClick={addItem}
            >
              +
            </Button>
          </TableRow>
        </TableBody>
      </CardContent>
    </Card>
  );
}

ListBox.propTypes = {
  link: PropTypes.string.isRequired,
  header: PropTypes.string,
  list: PropTypes.array,
  setList: PropTypes.func,
  setRerender: PropTypes.func,
  rerender: PropTypes.number,
};

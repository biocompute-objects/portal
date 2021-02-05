import React from 'react';
import {
  makeStyles, Typography
} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// For links.
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// For contact information.
import Tooltip from '@material-ui/core/Tooltip';

// Styling
const useStyles = makeStyles((theme) => ({
  listed: {
    color: 'white',
    paddingLeft: '16px'
  }
}));

// Pass an object and whether or not its keys are properties.
export default function RecursiveRows({ items }) {
  
  const classes = useStyles();

  // Arguments
  // ---------
  // items: JSON object (Execution Domain)

  // Define the keys.
  const itemsKeys = Object.keys(items);


  // ----- Meta Information ----- //
  

  // ----- None ----- //
  return (
    <ul className={classes.listed}>
      {
        typeof(items) == 'object'
          ?
            Array.isArray(items) == true
              ?
                typeof(items[0]) == 'string'
                  ?
                    items.map(item => (
                        <li className={classes.listed}>
                          <Typography>{item}</Typography>
                        </li>
                      )
                    )
                  :
                  <RecursiveRows items = {items[0]} />
              :
                itemsKeys.map(item => (
                    <li className={classes.listed}>
                        <Typography>{item}</Typography>
                        {<RecursiveRows items = {items[item]} />}
                    </li>
                  )
                )
          :
            <li className={classes.listed}>{items}</li>
      }
    </ul>
  );
}
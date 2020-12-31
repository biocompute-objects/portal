import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listed: {
    paddingLeft: '10px'
  }
}));

export default function RecursiveJson(items) {  
  
  const classes = useStyles();
  console.log(Object.keys(items));
  console.log(Object.keys(items).length);
  console.log('============================')
  
  return (
    <ul className={classes.listed}>
      {
        typeof(items) == 'object' 
          ?
            Object.keys(items).map(item => (
                <li className={classes.listed}>
                    {item}
                    {RecursiveJson(items[item])}
                </li>
              )
            )
          :
          typeof(items) == 'array'
            ?
              <li className={classes.listed}>ARRAY{items}</li>
            :
            <li className={classes.listed}>STRING{items}</li>
      }
    </ul>
  );
}
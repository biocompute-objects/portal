import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listed: {
    paddingLeft: '10px'
  }
}));

export default function RecursiveJson({ items }) {  
  
  const classes = useStyles();
  console.log('########################')
  console.log(items);
  console.log(Object.keys(items)[0]);
  console.log(items[Object.keys(items)[0]]);
  console.log(Array.isArray(items[Object.keys(items)[0]]));
  console.log('============================')

  // Define the keys.
  const itemsKeys = Object.keys(items);

  console.log('TEST');
  console.log('**************************');
  console.log(itemsKeys);
  console.log('**************************');
  console.log('END');
  
  return (
    <ul className={classes.listed}>
      {
        typeof(items) == 'object'
          ?
            Array.isArray(items[itemsKeys[0]]) == true
              ?
                items[itemsKeys].map(item => (
                    <li className={classes.listed}>
                      {itemsKeys}
                      {<RecursiveJson items = {item} />}
                    </li>
                  )
                )
              :
                itemsKeys.map(item => (
                    <li className={classes.listed}>
                        {console.log('====', items[item], '====')}
                        {item}
                        {<RecursiveJson items = {items[item]} />}
                    </li>
                  )
                )
          :
            <li className={classes.listed}>{items}</li>
      }
    </ul>
  );
}
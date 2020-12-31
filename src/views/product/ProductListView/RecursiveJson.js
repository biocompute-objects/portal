import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listed: {
    paddingLeft: '10px'
  }
}));

// Function to fetch references.
const fetchReferences = (relativeUri) => {

  // Take the relative URI and construct the full
  // URI, then fetch.

  // ...

}

// Pass an object and whether or not its keys are properties.
export default function RecursiveJson({ items, schemaProperty }) {  
  
  const classes = useStyles();

  // Define the keys.
  const itemsKeys = Object.keys(items);

  // If item is an object, it can be either a "true" object
  // or an array.  If it's an array, it can contain either
  // strings, or other objects.  If it's not an array, it
  // must be an object, so recurse that.  Finally, if it's 
  // not an object at all, it must be a string.

  // This code assumes that all items in an array are either
  // strings or objects.

  // Determine whether or not to render anything on the page
  // using scheamProperty.
  console.log(items);
  console.log(itemsKeys);

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
                          {item}
                        </li>
                      )
                    )
                  :
                  <RecursiveJson items = {items[0]} />
              :
                itemsKeys.map(item => (
                    <li className={classes.listed}>
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
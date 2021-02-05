import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listed: {
    listStyleType: 'none',
    paddingLeft: '10px'
  }
}));

// A function to process a key.
const processKey = (ikey) => {
  
  // Define the returnable variable.
  var returnable = '';
  
  // Split on the underscore, then capitalize.
  const splitUp = ikey.split('_');

  // Only process if we have anything.
  if(splitUp.length > 1) {

    // Join and return.
    var capJoined = [];

    splitUp.map(value => {
      if(value == 'id') {
        capJoined.push('ID')
      } else if(value == 'io') {
        capJoined.push('IO')
      } else {
        capJoined.push(value.charAt(0).toUpperCase() + value.slice(1));
      }
    });

    // Kick it back.
    returnable = capJoined.join(' ')

  } else {
    if(ikey == 'etag') {
      returnable = 'eTag';
    } else if(ikey == 'url') {
      returnable = 'URL';
    } else if(ikey == 'uri') {
      returnable = 'URI'
    } else if(ikey == 'email') {
      returnable = 'eMail'
    } else {
      returnable = ikey.charAt(0).toUpperCase() + ikey.slice(1);
    }
  }

  // Kick it back.
  return(returnable)

}

// Pass an object and whether or not its keys are properties.
export default function RecursiveJson({ items}) {  
  
  const classes = useStyles();

  // Arguments
  // ---------
  // items: JSON object

  // Define the keys.
  const itemsKeys = Object.keys(items);

  // If item is an object, it can be either a "true" object
  // or an array.  If it's an array, it can contain either
  // strings, or other objects.  If it's not an array, it
  // must be an object, so recurse that.  Finally, if it's 
  // not an object at all, it must be a string.

  // This code assumes that all items in an array are either
  // strings or objects.

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
                        {processKey(item)}
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
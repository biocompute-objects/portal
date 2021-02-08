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

// Function to define inputs.
const defineInputs = (fieldObject) => {

  // Search fieldObject for sets of defined keys
  // in order to build the input.
  
  // What are the defined keys?
  const keys = ['type', 'description', 'examples', 'format', 'pattern', 'readOnly']

  //<TextField disabled id="filled-disabled" label="Disabled" defaultValue="Hello World" variant="filled" />

}

// Pass an object and whether or not its keys are properties.
export default function RecursiveJson({ items, propertiesFlag }) {  
  
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
  
  // This code also only displays values (keys) that are direct
  // children of "properties" keys (excluding "properties" falling
  // under "definition").

  return (
    <ul className={classes.listed}>
      {
        typeof(items) === 'object'
          ?
            Array.isArray(items) === true
              ?
                <RecursiveJson items = {items[0]} />
              :
                itemsKeys.map(item => (
                    item !== "definitions"
                      ?
                        item === "properties"
                          ?
                            <RecursiveJson items = {items[item]} propertiesFlag = {true} />
                          :
                            propertiesFlag === true
                              ?
                                <li className={classes.listed}>
                                    {item}
                                    {<RecursiveJson items = {items[item]} propertiesFlag = {false} />}
                                </li>
                              :
                                <RecursiveJson items = {items[item]} propertiesFlag = {false} />
                      :
                        null
                  )
                )
          :
            null
      }
    </ul>
  );
}
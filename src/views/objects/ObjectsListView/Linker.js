import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

// For links.
import Link from '@material-ui/core/Link';

// SVG/Link styling
const useStyles = makeStyles((theme) => ({
  blackLink: {
    color: '#000000'
  },
  whiteLink: {
    color: '#ffffff'
  },
  translated: {
    WebkitTransform: 'translateY(7px)'
  }
}));

// Pass an object and whether or not its keys are properties.
export default function Linker({ uri, color, accessionOnly, state }) {  

  const svgClasses = useStyles();

  // Strip out the URI protocol so that we
  // can pass a request to the builder.
  
  // The URI to use.
  var uriProcessed = uri;
  var builderLink = '';
  console.log('uri: ', uri);
  
  // Accession only or full URI?
  if(accessionOnly === true) {

    // Parse based on state of the object.
    if(state === 'DRAFT') {

      // Keep only the last part of the URI.
      uriProcessed = uriProcessed.split('/');
      uriProcessed = uriProcessed.slice(-1)[0];

      builderLink = uri.split('://')[0] + '/' + uri.split('://')[1];

    } else if(state === 'PUBLISH') {

      // Keep only the last two parts of the URI.
      uriProcessed = uriProcessed.split('/');
      uriProcessed = uriProcessed.slice(-2)[0] + '/' + uriProcessed.slice(-1)[0];

    }
    
  }

  // Arguments
  // ---------
  // url (string): Link URL
  // color (string): Link color


  // ----- Meta Information ----- //

  
  // None.


  // ----- Linker ----- //




  return(
    state === 'DRAFT'
      ?
        <Link className = { svgClasses[color] } href = { 'http://127.0.0.1:3000/builder/' + builderLink } target="_blank">
          { uriProcessed }
        </Link>
      :
        <Link className = { svgClasses[color] } href = { 'http://127.0.0.1:3000/objects/view/' + uriProcessed } target="_blank">
          { uriProcessed }
        </Link>
  );
}
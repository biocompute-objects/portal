import React, { useContext } from 'react';
import {
  makeStyles
} from '@material-ui/core';

// For links.
import Link from '@material-ui/core/Link';

// Fetch context.
import { FetchContext } from '../../../App';

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

  // Fetch context.
  const fc = useContext(FetchContext);

  // Arguments
  // ---------
  // url (string): Link URL
  // color (string): Link color

  // Process the URI.
  const processed = uri.replace('://', '/');


  // ----- Meta Information ----- //

  
  // None.


  // ----- Linker ----- //
  
  
  return(
    state === 'DRAFT'
      ?
        <Link className = { svgClasses[color] } href = { window.location.href.replace('/objects', '/builder/') + processed } target="_blank">
          { processed.split('/').slice(-1) }
        </Link>
      :
        <Link className = { svgClasses[color] } href = { window.location.href + '/view/' + processed } target="_blank">
          { processed.split('/').slice(-2).join('/') }
        </Link>
  );


}
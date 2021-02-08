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
export default function Linker({ uri, color }) {  

  const svgClasses = useStyles();

  // Arguments
  // ---------
  // url (string): Link URL
  // color (string): Link color


  // ----- Meta Information ----- //

  
  // None.


  // ----- Linker ----- //


  return(
    <Link className={svgClasses[color]} href={uri} target="_blank">
      {uri}
    </Link>
  );
}
import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

// For links.
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

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
export default function LinkerInList({ uri, color }) {  

  const svgClasses = useStyles();

  // Arguments
  // ---------
  // url (string): Link URL
  // color (string): Link color


  // ----- Meta Information ----- //

  
  // None.


  // ----- Linker ----- //


  return(
    <ListItem button component="a" href={uri} target="_blank">
    	<ListItemText primary={
					<React.Fragment>
						{uri} <OpenInNewIcon className={svgClasses.translated} />
					</React.Fragment>
				} />
    </ListItem>
  );
}
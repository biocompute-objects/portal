// src/views/objects/ObjectsListView/Linker.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles
} from '@material-ui/core';

// For links.
import Link from '@material-ui/core/Link';

// SVG/Link styling
const useStyles = makeStyles(() => ({
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
export default function Linker({uri, color, state}) {
  const svgClasses = useStyles();

  // Arguments
  // ---------
  // url (string): Link URL
  // color (string): Link color
  // const [canEdit, setCanEdit] = useState(false)
  // Process the URI.
  const processed = uri.replace('://', '/');

  // ----- Meta Information ----- //

  // None.

  // ----- Linker ----- //

  return (
    state === 'DRAFT'
      ? (
        <Link className={svgClasses[color]} href={window.location.href.replace('/objects', '/builder/') + processed} target="_blank">
          { processed.split('/').slice(-1) }
        </Link>
      )
      : (
        <Link className={svgClasses[color]} href={`${window.location.href}/view/${processed}`} target="_blank">
          { processed.split('/').slice(-2).join('/') }
        </Link>
      )
  );
}

Linker.propTypes = {
  uri: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};

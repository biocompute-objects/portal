// /src/layouts/shared/BottomBar.js

import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';

// Links
import Link from '@material-ui/core/Link';

import { FetchContext } from '../../App';

const useStyles = makeStyles(() => ({
  root: {},
  appBar: {
    bottom: 0,
    top: 'auto',
    zIndex: 2600
  },
  bottom: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '32px'
  },
  bottomLink: {
    color: 'orange'
  }
}));

const BottomBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  // Fetch context.
  const fc = useContext(FetchContext);
  return (
    <AppBar
      className={clsx(classes.root, className, classes.appBar)}
      elevation={0}
      position="fixed"
      {...rest}
    >
      <Toolbar className={classes.bottom}>
        <Typography>
          <Link
            className={classes.bottomLink}
            href={`https://github.com/biocompute-objects/portal/tree/${fc.versions.portal}`}
            target="_blank"
          >
            BioCompute Portal
            {' '}
            {fc.versions.portal}
          </Link>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            className={classes.bottomLink}
            rel="noopener"
            href={`https://github.com/biocompute-objects/bco_api/tree/${fc.versions.bcodb}`}
            target="_blank"
          >
            BCODB
            {' '}
            {fc.versions.bcodb}
          </Link>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            className={classes.bottomLink}
            href={`https://github.com/biocompute-objects/userdb/tree/${fc.versions.userdb}`}
            target="_blank"
          >
            Portal UserDB
            {' '}
            {fc.versions.userdb}
          </Link>
          {' '}
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            className={classes.bottomLink}
            href="https://docs.biocomputeobject.org/contact"
            target="_blank"
          >
            Contact Us
          </Link>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            className={classes.bottomLink}
            href="https://github.com/biocompute-objects/portal/issues/new/choose"
            target="_blank"
          >
            Report bug or request feature
          </Link>
        </Typography>
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
};

BottomBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default BottomBar;

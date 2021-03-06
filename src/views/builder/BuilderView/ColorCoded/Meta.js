

import React, { useContext, useEffect, useState } from 'react';
import {
  Button, makeStyles, withStyles, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import hash from "object-hash";

// For links.
import Linker from './components/Linker';

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// SVG/Link styling
const useStyles = makeStyles((theme) => ({
  linked: {
    color: '#ffffff'
  },
  translated: {
    WebkitTransform: 'translateY(7px)'
  },
  root: {
    color: 'white'
  }
}));

// Pass an object and whether or not its keys are properties.
export default function Meta({ items }) {
  const classes = withStyles();
  const svgClasses = useStyles();
  const makeETag = () => {
    const hashContents = { ...items.objectContents };
    delete hashContents.object_id;
    delete hashContents.spec_version;
    delete hashContents.etag;
    const etag = hash(hashContents);
    items.setMeEtag(etag);
    // items.setMeEtagSet(true);
    items.setRerender(items.rerender + 1);
    console.log('items 1', items.meEtag);
    console.log('items 2', etag);
    console.log('items 3', items.objectContents);
    items.setMeEtagSet(false);
  };

  useEffect(() => {
    if (items.meEtagSet) {
      makeETag();
      items.setMeEtagSet(false);
    }
  }, [items.meEtagSet]);

  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h1">
              Object Information
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledCell>
            <Typography variant="h3">
              Object ID
            </Typography>
          </StyledCell>
          <StyledCell>
            <TextField InputProps={{ className: classes.root }} disabled label={items.meObjectId} fullWidth id="outlined-basic" variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            <Typography variant="h3">
              Spec Version
            </Typography>
          </StyledCell>
          <StyledCell>
            <Linker color="blackLink" uri="https://opensource.ieee.org/2791-object/ieee-2791-schema/" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            <Typography variant="h3">
              eTag
            </Typography>
          </StyledCell>
          <StyledCell>
            <TextField InputProps={{ className: classes.root }} disabled label={items.meEtag} fullWidth id="outlined-basic" variant="outlined" />
          </StyledCell>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            onClick={() => makeETag()}
          >
            Generate eTag
          </Button>
        </TableRow>
      </TableBody>
    </Table>
  );
}

Meta.propTypes = {
  items: PropTypes.object.isRequired
};

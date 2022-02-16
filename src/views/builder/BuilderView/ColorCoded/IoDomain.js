import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Card
} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import UriObject from 'src/components/UriObject';

// Section cell styling
const useStyles = makeStyles(() => ({
  header: {
    color: 'black'
  },
  missingHeader: {
    color: 'red'
  },
  root: {
    color: 'black'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function IoDomain({ items, cF }) {
  const classes = useStyles();

  return (
    <Card>
      <UriObject
        header={'Input Subdomain'}
        list={items.iodInputSubdomain}
        setList={items.setIodInputSubdomain}
        setRerender={items.setRerender}
        rerender={items.rerender}
      />
      <UriObject
        header={'Output Subdomain'}
        list={items.iodOutputSubdomain}
        setList={items.setIodOutputSubdomain}
        setRerender={items.setRerender}
        rerender={items.rerender}
        additional_field={'mediatype'}
      />

    </Card>
  );
}

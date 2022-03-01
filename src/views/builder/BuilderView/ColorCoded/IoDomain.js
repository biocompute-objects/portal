import React from 'react';
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

// Pass an object and whether or not its keys are properties.
export default function IoDomain({ items, cF }) {
  const classes = useStyles();

  return (
    <Card>
      <UriObject
        link={'https://docs.biocomputeobject.org/io-domain/'}
        header={'Input Subdomain'}
        list={items.iodInputSubdomain}
        setList={items.setIodInputSubdomain}
        setRerender={items.setRerender}
        rerender={items.rerender}
      />
      <UriObject
        link={'https://docs.biocomputeobject.org/io-domain/'}
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

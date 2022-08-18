import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import UriObject from 'src/components/UriObject';
import PropTypes from 'prop-types';

// Pass an object and whether or not its keys are properties.
export default function IoDomain({ items }) {
  const link = 'https://docs.biocomputeobject.org/io-domain/';
  return (
    <Card>
      <CardActionArea onClick={() => window.open(link)}>
        <CardContent >
          <Typography variant="h1">
            IO Domain &nbsp;
            <HelpIcon />
          </Typography>
        </CardContent>
      </CardActionArea>
      <UriObject
        link="https://docs.biocomputeobject.org/io-domain/"
        header="Input Subdomain"
        list={items.iodInputSubdomain}
        setList={items.setIodInputSubdomain}
        setRerender={items.setRerender}
        rerender={items.rerender}
      />
      <UriObject
        link="https://docs.biocomputeobject.org/io-domain/"
        header="Output Subdomain"
        list={items.iodOutputSubdomain}
        setList={items.setIodOutputSubdomain}
        setRerender={items.setRerender}
        rerender={items.rerender}
        additionalField="mediatype"
      />

    </Card>
  );
}

IoDomain.propTypes = {
  items: PropTypes.object,
};

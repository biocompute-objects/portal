import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import UriObject from 'src/components/UriObject';
import PropTypes from 'prop-types';

// Pass an object and whether or not its keys are properties.
export default function IoDomain({ items }) {
  const link = 'https://docs.biocomputeobject.org/io-domain/';
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h3">
          IO Domain
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card>
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
      </AccordionDetails>
    </Accordion>
  );
}

IoDomain.propTypes = {
  items: PropTypes.object,
};

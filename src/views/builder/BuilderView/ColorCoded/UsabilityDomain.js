import React, { useEffect, useState } from 'react';
import ListBox from 'src/components/ListBox';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';

// Pass an object and whether or not its keys are properties.
export default function UsabilityDomain({ items }) {
  const listHeaders = 'Usability Domain';
  const [missingUsabilityDomain, setMissingUsabilityDomain] = useState(false);

  useEffect(() => {
    if (!items.ud) {
      setMissingUsabilityDomain(true);
    } else {
      setMissingUsabilityDomain(false);
    }
  }, [items.ud]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h3">
          Usability Domain
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          variant="contained"
          onClick={() => window.open('https://docs.biocomputeobject.org/usability-domain/')}
        >
          <HelpIcon />
        </Button>
        <ListBox
          link="noLink"
          header={listHeaders}
          list={items.ud}
          setList={items.setUd}
          setRerender={items.setRerender}
          rerender={items.rerender}
        />
      </AccordionDetails>
    </Accordion>
  );
}

UsabilityDomain.propTypes = {
  items: PropTypes.object.isRequired,
};

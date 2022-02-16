import React, { useEffect, useState } from 'react';
import ListBox from 'src/components/ListBox';
import PropTypes from 'prop-types';

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
    <ListBox
      link="https://docs.biocomputeobject.org/usability-domain/"
      header={listHeaders}
      list={items.ud}
      setList={items.setUd}
      setRerender={items.setRerender}
      rerender={items.rerender}
    />
  );
}

UsabilityDomain.propTypes = {
  items: PropTypes.object.isRequired,
};

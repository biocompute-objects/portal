import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import ListBox from 'src/components/ListBox';


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
export default function UsabilityDomain({ items }) {
  const listHeaders = 'Usability Domain';
  const [missingUsabilityDomain, setMissingUsabilityDomain] = useState(false);

  useEffect(() => {
    if (items.ud[0] === '') {
      setMissingUsabilityDomain(true);
    } else {
      setMissingUsabilityDomain(false);
    }
  }, [items]);

  return (
    <ListBox
      link="https://docs.biocomputeobject.org/usability-domain/"
      header={listHeaders}
      list={items.ud}
      setList={items.setUd}
      setRerender={items.setRerender}
    />
  );
}

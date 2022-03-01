/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
  withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Linker from './components/Linker';

// For contact information.

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// A function to process a key.
const processKey = (ikey) => {
  // Define the returnable variable.
  let returnable = '';

  // Split on the underscore, then capitalize.
  const splitUp = ikey.split('_');

  // Only process if we have anything.
  if (splitUp.length > 1) {
    // Join and return.
    const capJoined = [];

    splitUp.map((value) => {
      if (value === 'id') {
        capJoined.push('ID');
      } else if (value === 'io') {
        capJoined.push('IO');
      } else {
        capJoined.push(value.charAt(0).toUpperCase() + value.slice(1));
      }
      return true;
    });

    // Kick it back.
    returnable = capJoined.join(' ');
  } else if (ikey === 'etag') {
    returnable = 'eTag';
  } else if (ikey === 'url') {
    returnable = 'URL';
  } else if (ikey === 'uri') {
    returnable = 'URI';
  } else if (ikey === 'email') {
    returnable = 'eMail';
  } else if (ikey === 'orcid') {
    returnable = 'ORCID';
  } else {
    returnable = ikey.charAt(0).toUpperCase() + ikey.slice(1);
  }

  // Kick it back.
  return (returnable);
};

// Pass an object and whether its keys are properties.
export default function ProvenanceDomain({ items }) {
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Provenance Domain)

  // The arrays containing the information can be processed here.

  // ----- Meta Information ----- //

  // An array to hold all the meta information.
  const provenanceMeta = {
    Name: items.name,
    Version: items.version,
    License: items.license,
    Created: items.created,
    Modified: items.modified
  };

  // Define the meta keys.
  const metaKeys = Object.keys(provenanceMeta);

  // Try to add optional keys.
  try {
    metaKeys.Embargo = items.embargo;
  } finally {

    // Leave metaKeys alone if the embargo
    // wasn't there.

  }

  // ----- Contributors ----- //

  // Define the *unique* contributor keys.
  // We want the unique keys because not all contributors will
  // have the same keys.
  let contributorKeys = [];
  items.contributors.map((item) => {
    contributorKeys.push(Object.keys(item));
    return true;
  });

  // Collapse the array of arrays.
  // Source: https://stackoverflow.com/questions/19191474/how-do-i-collapse-an-array-of-arrays-into-an-array-of-all-the-elements
  let collapsed = [];
  collapsed = (collapsed.concat.apply(collapsed, contributorKeys)).filter(Boolean);

  // Unique keys.
  // Source: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  contributorKeys = collapsed.filter(onlyUnique);

  // Re-arrange the keys in tempArray for display purposes.

  // The two that are "guaranteed" to be there (as of
  // IEEE 2791-2020 are "name" and "contribution").

  // Source: https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript

  // Temp array to help with the rearrangement.
  const tempArray = contributorKeys.filter((x) => !['name', 'contribution'].includes(x));
  tempArray.unshift('name', 'contribution');
  contributorKeys = tempArray;
  // const reviewItems = [];
  const reviews = [];
  const reviewKeys = ['status', 'name', 'affiliation', 'reviewer_comment', 'date'];

  if (items.review) {
    items.review.map((review) => {
      const reviewObject = ({
        status: '',
        reviewer_comment: '',
        date: '',
        name: '',
        affiliation: '',
        email: '',
        contribution: [],
        orcid: ''
      });
      contributorKeys.map((contitem) => {
        if (contitem in review.reviewer) {
          reviewObject[contitem] = review.reviewer[contitem];
        } else {
          reviewObject[contitem] = '';
        }
        return true;
      });

      for (const [key, value] of Object.entries(review)) {
        if (key in reviewObject) {
          reviewObject[key] = value;
        }
      }
      reviews.push(reviewObject);
      return true;
    });
  }

  // An array to hold all the contributors.
  const provenanceContributors = [];

  // Go over each contributor and see what fields they have.
  // TODO: I think this logic will need to be looked at - doesn't look like it makes a lasting change
  //       the tempArray variable looks like it is a shadow variable and I don't see where it is changing
  //       anything else.
  items.contributors.map((item) => {
    // Construct a temporary array to hold the
    // contributor information.
    const tempArray = {};

    contributorKeys.map((subitem) => {
      // See if the key exists.  If not, just put 'None'.
      if (subitem in item) {
        // Even if the key exists, the field
        // may be blank, so check for blank fields.
        let blankFlag = 0;
        for (const cont of ['', '', [], {}]) {
          if (item[subitem] === cont) {
            tempArray[subitem] = 'None';
            blankFlag = 1;
            break;
          }
        }

        // Was the value blank?
        if (blankFlag === 0) {
          // For fields that contain lists, we need to
          // join on ','.
          if (Array.isArray(item[subitem]) && typeof (item[subitem][0]) === 'string') {
            tempArray[subitem] = item[subitem].join(', ');
          } else {
            tempArray[subitem] = item[subitem];
          }
        }
      } else {
        tempArray[subitem] = 'None';
      }
      // TODO: We're not doing anything with the tempArray within this scope it looks like?
      return true;
    });

    // Add the temp array to provenanceContributors.
    provenanceContributors.push(tempArray);
    return true;
  });

  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h3">
              Provenance Domain
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          metaKeys.map((item) => (
            <TableRow>
              <StyledCell>
                {item}
              </StyledCell>
              <StyledCell colSpan="4" noGutter>
                {
                    item === 'License'
                      ? <Linker color="whiteLink" uri={provenanceMeta[item]} />
                      : provenanceMeta[item]
                  }
              </StyledCell>
            </TableRow>
          ))
        }
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h4">
              Contributors
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          {
          contributorKeys.map((item) => (
            <StyledCell>{processKey(item)}</StyledCell>
          ))
        }
        </TableRow>
        {
          provenanceContributors.map((item) => (
            <TableRow>
              {
              contributorKeys.map((subitem) => (
                <StyledCell>{item[subitem]}</StyledCell>
              ))
            }
            </TableRow>
          ))
        }
        <TableRow>
          <StyledCell colSpan="5">
            <Typography variant="h3">
              Review
            </Typography>
          </StyledCell>
        </TableRow>
        {}
        <TableRow>
          {
          reviewKeys.map((item) => (
            <StyledCell>{processKey(item)}</StyledCell>
          ))
        }
        </TableRow>
        {
        reviews.map((item) => (
          <TableRow>
            {
              reviewKeys.map((subitem) => (
                <StyledCell>{item[subitem]}</StyledCell>
              ))
            }
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
  );
}

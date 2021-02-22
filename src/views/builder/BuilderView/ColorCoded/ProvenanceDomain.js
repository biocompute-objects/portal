import React from 'react';
import {
  withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Inputs
import TextField from '@material-ui/core/TextField';

// Add contributor
import Button from '@material-ui/core/Button'

// Contribution select
import Contribution from './components/Contribution'

// For links.
import Linker from './components/Linker';

// For contact information.
import Tooltip from '@material-ui/core/Tooltip';

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Tooltip styling
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

// A function to process a key.
const processKey = (ikey) => {
  
  // Define the returnable variable.
  var returnable = '';
  
  // Split on the underscore, then capitalize.
  const splitUp = ikey.split('_');

  // Only process if we have anything.
  if(splitUp.length > 1) {

    // Join and return.
    var capJoined = [];

    splitUp.map(value => {
      if(value === 'id') {
        capJoined.push('ID')
      } else if(value === 'io') {
        capJoined.push('IO')
      } else {
        capJoined.push(value.charAt(0).toUpperCase() + value.slice(1));
      }
    });

    // Kick it back.
    returnable = capJoined.join(' ')

  } else {
    if(ikey === 'etag') {
      returnable = 'eTag';
    } else if(ikey === 'url') {
      returnable = 'URL';
    } else if(ikey === 'uri') {
      returnable = 'URI'
    } else if(ikey === 'email') {
      returnable = 'eMail'
    } else if(ikey === 'orcid') {
      returnable = 'ORCID'
    } else {
      returnable = ikey.charAt(0).toUpperCase() + ikey.slice(1);
    }
  }

  // Kick it back.
  return(returnable)

}

// Pass an object and whether or not its keys are properties.
export default function ProvenanceDomain({ items, cF }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Provenance Domain)

  // The arrays containing the information can be processed here.  


  // ----- Meta Information ----- //
  

  // An array to hold all the meta information.  
  const provenanceMeta = {
    'Version': cF(items.version),
    'License': cF(items.license),
    'Created': cF(items.created),
    'Modified': cF(items.modified),
    'Derived from': cF(items.derived_from),
    'Obsolete after': cF(items.obsolete_after)
  }

  // Define the meta keys.
  const metaKeys = Object.keys(provenanceMeta);


  // ----- Contributors ----- //


  // Define the *unique* contributor keys.
  // We want the unique keys because not all contributors will
  // have the same keys.
  // var contributorKeys = [];
  // items.contributors.map(item => {
  //     contributorKeys.push(Object.keys(item));
  //   }
  // );

  // Collapse the array of arrays.
  // Source: https://stackoverflow.com/questions/19191474/how-do-i-collapse-an-array-of-arrays-into-an-array-of-all-the-elements
  // var collapsed = [];
  // collapsed = (collapsed.concat.apply(collapsed, contributorKeys)).filter(Boolean);
  
  // // Unique keys.
  // // Source: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }
  
  // contributorKeys = collapsed.filter(onlyUnique);

  // // Re-arrange the keys in tempArray for display purposes.

  // // The two that are "guaranteed" to be there (as of
  // // IEEE 2791-2020 are "name" and "contribution").

  // // Source: https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript

  // // Temp array to help with the rearrangement.
  // var tempArray = contributorKeys.filter(x => !['name', 'contribution'].includes(x));
  // tempArray.unshift('name', 'contribution');
  // contributorKeys = tempArray;

  // // An array to hold all the contributors.
  // var provenanceContributors = [];

  // // Go over each contributor and see what fields they have.
  // items.contributors.map(item => {
    
  //   // Construct a temporary array to hold the 
  //   // contributor information.
  //   var tempArray = {};
    
  //   contributorKeys.map(subitem => {
      
  //         // See if the key exists.  If not, just put 'None'.      
  //         if(subitem in item) {
            
  //           // Even if the key exists, the field
  //           // may be blank, so check for blank fields.
  //           var blank_flag = 0;
  //           for(var i of ['', "", [], {}]) {
  //             if(item[subitem] === i) {
  //               tempArray[subitem] = 'None';
  //               blank_flag = 1;
  //               break;
  //             }
  //           }

  //           // Was the value blank?
  //           if(blank_flag === 0){
              
  //             // For fields that contain lists, we need to 
  //             // join on ','.
  //             if(Array.isArray(item[subitem]) && typeof(item[subitem][0]) == 'string') {
  //               tempArray[subitem] = item[subitem].join(', ');
  //             } else {
  //               tempArray[subitem] = item[subitem];
  //             }
              
  //           }
            
  //         } else {
  //           tempArray[subitem] = 'None';
  //         }
  //       }
  //     )

  //   // Add the temp array to provenanceContributors.
  //   provenanceContributors.push(tempArray);

  //   }
  // );

  return(
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="6">
            <Typography variant="h3">
              Provenance Domain
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <StyledCell>
            Name
          </StyledCell>
          <StyledCell noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.name)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            Version
          </StyledCell>
          <StyledCell noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.version)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            License
          </StyledCell>
          <StyledCell noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.license)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            Derived From
          </StyledCell>
          <StyledCell colSpan="5" noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.derived_from)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
        </TableRow>
        <TableRow>
          <StyledCell>
            Created
          </StyledCell>
          <StyledCell noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.created)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            Modified
          </StyledCell>
          <StyledCell noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.modified)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            Obsolete After
          </StyledCell>
          <StyledCell noGutter>
            <TextField fullWidth id="outlined-basic" defaultValue={cF(items.obsolete_after)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="6">Embargo</StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>Start Time</StyledCell>
          <StyledCell colSpan="5">End Time</StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell><TextField variant="outlined"></TextField></StyledCell>
          <StyledCell colSpan="5"><TextField variant="outlined"></TextField></StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="6">Review</StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>Date</StyledCell>
          <StyledCell>Status</StyledCell>
          <StyledCell>Reviewer</StyledCell>
          <StyledCell colSpan="3">Reviewer Comment</StyledCell> 
        </TableRow>
        <TableRow>
          <StyledCell><TextField variant="outlined"></TextField></StyledCell>
          <StyledCell><TextField variant="outlined"></TextField></StyledCell>
          <StyledCell><TextField variant="outlined"></TextField></StyledCell>
          <StyledCell colSpan="2"><TextField fullWidth multiline rows={4} variant="outlined"></TextField></StyledCell>
          <StyledCell>
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => alert('here')}>
              Remove
            </Button>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="5">
            <Button variant="contained" color="primary" disableElevation fullWidth>
              Add Reviewer
            </Button>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="6">Contributors</StyledCell>
        </TableRow>
        <TableRow>
        {
          ['Name', 'Contribution', 'Affiliation', 'eMail', 'ORCID'].map(item => (
              item !== 'ORCID'
                ?
                  <StyledCell>{item}</StyledCell>
                :
                  <StyledCell colSpan="2">{item}</StyledCell>
            )
          )
        }
        </TableRow>
        <TableRow>
          {
            [1,2,3,4,5].map(item => (
                item === 2
                  ?
                    <StyledCell><Contribution /></StyledCell>
                  :
                    <StyledCell><TextField variant="outlined"></TextField></StyledCell>
              )
            )
          }
          <StyledCell>
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => alert('here')}>
              Remove
            </Button>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="5">
            <Button fillWidth variant="contained" color="primary" disableElevation fullWidth>
              Add Contributor
            </Button>
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  /*
  return (
    <ul className={classes.listed}>
      {
        typeof(items) == 'object'
          ?
            Array.isArray(items) == true
              ?
                typeof(items[0]) == 'string'
                  ?
                    items.map(item => (
                        <li className={classes.listed}>
                          {item}
                        </li>
                      )
                    )
                  :
                  <RecursiveJson items = {items[0]} />
              :
                itemsKeys.map(item => (
                    <li className={classes.listed}>
                        {processKey(item)}
                        {<RecursiveJson items = {items[item]} />}
                    </li>
                  )
                )
          :
            <li className={classes.listed}>{items}</li>
      }
    </ul>
  );
  */
}
import React from 'react';
import {
  withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
      if(value == 'id') {
        capJoined.push('ID')
      } else if(value == 'io') {
        capJoined.push('IO')
      } else {
        capJoined.push(value.charAt(0).toUpperCase() + value.slice(1));
      }
    });

    // Kick it back.
    returnable = capJoined.join(' ')

  } else {
    if(ikey == 'etag') {
      returnable = 'eTag';
    } else if(ikey == 'url') {
      returnable = 'URL';
    } else if(ikey == 'uri') {
      returnable = 'URI'
    } else if(ikey == 'email') {
      returnable = 'eMail'
    } else if(ikey == 'orcid') {
      returnable = 'ORCID'
    } else {
      returnable = ikey.charAt(0).toUpperCase() + ikey.slice(1);
    }
  }

  // Kick it back.
  return(returnable)

}

// Pass an object and whether or not its keys are properties.
export default function ProvenanceDomain({ items }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Provenance Domain)

  // The arrays containing the information can be processed here.


  // ----- Meta Information ----- //

  
  // An array to hold all the meta information.
  const provenanceMeta = {
    'Name': items.name,
    'Version': items.version,
    'License': items.license,
    'Created': items.created,
    'Modified': items.modified
  }

  // Define the meta keys.
  const metaKeys = Object.keys(provenanceMeta);

  // Try to add optional keys.
  try {
    metaKeys['Embargo'] = items.embargo;
  } finally {

    // Leave metaKeys alone if the embargo
    // wasn't there.
    
  }
  

  // ----- Contributors ----- //


  // Define the *unique* contributor keys.
  // We want the unique keys because not all contributors will
  // have the same keys.
  var contributorKeys = [];
  items.contributors.map(item => {
      contributorKeys.push(Object.keys(item));
    }
  );

  // Collapse the array of arrays.
  // Source: https://stackoverflow.com/questions/19191474/how-do-i-collapse-an-array-of-arrays-into-an-array-of-all-the-elements
  var collapsed = [];
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
  var tempArray = contributorKeys.filter(x => !['name', 'contribution'].includes(x));
  tempArray.unshift('name', 'contribution');
  contributorKeys = tempArray;

  // An array to hold all the contributors.
  var provenanceContributors = [];

  // Go over each contributor and see what fields they have.
  items.contributors.map(item => {
    
    // Construct a temporary array to hold the 
    // contributor information.
    var tempArray = {};
    
    contributorKeys.map(subitem => {
      
          // See if the key exists.  If not, just put 'None'.      
          if(subitem in item) {
            
            // Even if the key exists, the field
            // may be blank, so check for blank fields.
            var blank_flag = 0;
            for(var i of ['', "", [], {}]) {
              if(item[subitem] === i) {
                tempArray[subitem] = 'None';
                blank_flag = 1;
                break;
              }
            }

            // Was the value blank?
            if(blank_flag === 0){
              
              // For fields that contain lists, we need to 
              // join on ','.
              if(Array.isArray(item[subitem]) && typeof(item[subitem][0]) == 'string') {
                console.log('====', item[subitem]);
                tempArray[subitem] = item[subitem].join(', ');
              } else {
                console.log('++++', item[subitem]);
                tempArray[subitem] = item[subitem];
              }
              
            }
            
          } else {
            tempArray[subitem] = 'None';
          }
        }
      )

    // Add the temp array to provenanceContributors.
    provenanceContributors.push(tempArray);

    }
  );

  console.log(provenanceContributors);

  return(
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
        metaKeys.map(item => (
            <TableRow>
              <StyledCell>
                {item}
              </StyledCell>
              <StyledCell colSpan="4" noGutter>
                {
                  item == 'License'
                    ?
                      <Linker color= { 'whiteLink' } uri={ provenanceMeta[item] } />
                    :
                      provenanceMeta[item]
                }
              </StyledCell>
          </TableRow>
          )
        )
      }
      <TableRow>
      {
        contributorKeys.map(item => (
            <StyledCell>{processKey(item)}</StyledCell>
          )
        )
      }
      </TableRow>
      {
        provenanceContributors.map(item => (
            <TableRow>
              {
                contributorKeys.map(subitem => (
                    subitem == 'email'
                      ?
                        <StyledCell>
                          {
                            <HtmlTooltip
                              interactive
                              title={
                                <React.Fragment>
                                  <Typography align="center">Profile</Typography>
                                  <Typography align="center"><img src="/static/Hadley.png" /></Typography>
                                  <Typography>Hadley King</Typography>
                                  <Typography>Research Associate</Typography>
                                  <Typography>Funny guy</Typography>
                                  <Typography>{item[subitem]}</Typography>
                                </React.Fragment>
                              }
                            >
                              <Typography>{item[subitem]}</Typography>
                            </HtmlTooltip>
                          }
                        </StyledCell>
                      :
                        <StyledCell>{item[subitem]}</StyledCell>
                  )
                )
              }
            </TableRow>
          )
        )
      }
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
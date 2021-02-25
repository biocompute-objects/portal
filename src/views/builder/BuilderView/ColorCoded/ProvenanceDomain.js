import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Datetime picker
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import DatePicker from "react-datepicker";

// Inputs
import TextField from '@material-ui/core/TextField';

// Add contributor
import Button from '@material-ui/core/Button'

// Contribution select
import Contribution from './components/Contribution'

// Reviewer contribution select
import ContributionReviewer from './components/ContributionReviewer';

// Section cell styling
const useStyles = makeStyles((theme) => ({
  header: {
    color: 'white'
  },
  missingHeader: {
    color: 'red'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function ProvenanceDomain({ items, cF }) {
  
  const classes = useStyles();

  console.log('ProvenanceDomain:', items);

  // State for showing missing sections.
  const [missingContributors, setMissingContributors] = useState(false);

  // TODO: For some reason didn't work with [items.pdContributors]

  useEffect(() => {
    if(items.pdContributors.length === 0) {
      setMissingContributors(true);
    } else {
      setMissingContributors(false);
    }
  }, [items])

  // Check for semantic versioning
  // Source: https://semver.org/spec/v2.0.0.html
  // Source: https://stackoverflow.com/questions/43134195/how-to-allow-only-numbers-in-textbox-and-format-as-us-mobile-number-format-in-re
  // Source: https://stackoverflow.com/questions/6603015/check-whether-a-string-matches-a-regex-in-js
  // Source: https://stackoverflow.com/questions/17885855/use-dynamic-variable-string-as-regex-pattern-in-javascript

  const checkSemanticVersioning = (e) => {
    
    // TODO: Fix so that version dots exists in input.
    // TODO: Fix so that 
    
    // Only allow numbers and periods.
    const onlyNumsPeriods = e.replace(/[^0-9\.]/g, '');

    // REGEX patterns that are allowed.
    const patternZero = new RegExp('^$');
    const patternOne = new RegExp('^[1-9]+$');
    const patternTwo = new RegExp('^[1-9]+\.$');
    const patternThree = new RegExp('^[1-9]+\.[1-9]+[0-9]*$');

    if(patternZero.test(onlyNumsPeriods)) {

      items.setPdVersion(onlyNumsPeriods);

    } else if(patternOne.test(onlyNumsPeriods)) {

      items.setPdVersion(onlyNumsPeriods);

    } else if(patternTwo.test(onlyNumsPeriods)) {

      items.setPdVersion(onlyNumsPeriods);
      
    } else if(patternThree.test(onlyNumsPeriods)) {

      items.setPdVersion(onlyNumsPeriods);

      // Remove the error flag only on this pattern,
      // since we have a fully semantic version number.
      // set...

    }

  }

  // Check for an e-mail input
  // Source: https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react

  const checkeMailInput = (e) => {



  }

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based 
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInput = (event, i, inputName, which) => {
    
    // Get the state variable.
    var dummy = items[which];

    // Change the value at the given index.
    dummy[i][inputName] = event.target.value;

    // Cases
    if(which == 'pdReview') {

      // Update the state.
      items.setPdReview(dummy);

    } else if(which == 'pdContributors') {
      
      // Update the state.
      items.setPdContributors(dummy);

    }

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }
  
  // Add a row
  const addRows = (which) => {

    // Get the state variable.
    var dummy = items[which];

    // Cases
    if(which == 'pdReview') {

      // Push the new row.
      dummy.push({
        "date": "",
        "status": "",
        "reviewer": {
          "name": "",
          "affiliation": "",
          "email": "",
          "contribution": ""
        },
        "reviewer_comment": ""
      });

      // Update the state.
      items.setPdReview(dummy);

    } else if(which == 'pdContributors') {

      // Push the new row.
      dummy.push({
        "name": "",
        "contribution": "",
        "affiliation": "",
        "email": "",
        "orcid": ""
      });

      // Update the state.
      items.setPdContributors(dummy);

    }

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row
  const removeRows = (which, i) => {

    // Get the state variable.
    var dummy = items[which];

    // Remove the index.
    dummy.splice(i, 1);

    // Cases

    if(which == 'pdReview') {

      // Update the state.
      items.setPdReview(dummy);

    } else if(which == 'pdContributors') {

      // Update the state.
      console.log('asdfffffffffffffff')
      items.setPdContributors(dummy);

    }
    
    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Arguments
  // ---------
  // items: JSON object (Provenance Domain)

  // The arrays containing the information can be processed here.  


  // ----- Meta Information ----- //

  return(
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledCell colSpan="8">
            <Typography variant="h1">
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
          <StyledCell colSpan="3" noGutter>
            <TextField error={cF(items.pdName) === "" ? true : false} fullWidth id="outlined-basic" value={cF(items.pdName)} onChange={(e) => items.setPdName(e.target.value)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            Version
          </StyledCell>
          <StyledCell noGutter>
            <TextField error={cF(items.pdVersion) === "" ? true : false} fullWidth id="outlined-basic" value={cF(items.pdVersion)} onChange={(e) => checkSemanticVersioning(e.target.value)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            License
          </StyledCell>
          <StyledCell colSpan="3" noGutter>
            <TextField error={cF(items.pdLicense) === "" ? true : false} fullWidth id="outlined-basic" value={cF(items.pdLicense)} onChange={(e) => items.setPdLicense(e.target.value)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            Derived From
          </StyledCell>
          <StyledCell colSpan="9" noGutter>
            <TextField fullWidth id="outlined-basic" value={cF(items.pdDerivedFrom)} onChange={(e) => items.setPdDerivedFrom(e.target.value)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
        </TableRow>
        <TableRow>
          <StyledCell>
            Created
          </StyledCell>
          <StyledCell noGutter>
            <TextField label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(items.pdDerivedFrom)} onChange={(e) => items.setPdCreated(e.target.value)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            Modified
          </StyledCell>
          <StyledCell noGutter>
            <DatePicker />
          </StyledCell>
          <StyledCell>
            Obsolete After
          </StyledCell>
          <StyledCell noGutter>
          <Datetime />
          </StyledCell>
          <StyledCell>
            Embargo Start Time
          </StyledCell>
          <StyledCell noGutter>
          <Datetime />
          </StyledCell>
          <StyledCell>
            Embargo End Time
          </StyledCell>
          <StyledCell noGutter>
          <Datetime />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="10">
            <Typography variant="h3">
              Review
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>Date</StyledCell>
          <StyledCell>Status</StyledCell>
          <StyledCell>Reviewer Name</StyledCell>
          <StyledCell>Reviewer Affiliation</StyledCell>
          <StyledCell>Reviewer e-Mail</StyledCell>
          <StyledCell>Reviewer Contribution</StyledCell>
          <StyledCell colSpan="4">Reviewer Comment</StyledCell>
        </TableRow>
        {
          items.pdReview.map((item, index) => (
              <TableRow key={index}>
                <StyledCell><TextField fullWidth variant="outlined" value={cF(item.date)} onChange={(e) => setInput(e, index, 'date')} /></StyledCell>
                <StyledCell>
                  <ContributionReviewer />
                </StyledCell>
                <StyledCell>
                  <TextField error={cF(item.reviewer.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.reviewer.name)} onChange={(e) => setInput(e, 'pdReview', index)} />
                </StyledCell>
                <StyledCell><TextField fullWidth variant="outlined" value={cF(item.reviewer.affiliation)} onChange={(e) => setInput(e, index, 'reviewer')} /></StyledCell>
                <StyledCell><TextField fullWidth variant="outlined" value={cF(item.reviewer.email)} onChange={(e) => setInput(e, index, 'reviewer')} /></StyledCell>
                <StyledCell><Contribution /></StyledCell>
                <StyledCell colSpan="3"><TextField fullWidth variant="outlined" multiline rows={4} value={cF(item.reviewer_comment)} onChange={(e) => setInput(e, index, 'reviewer_comment')} /></StyledCell>
                <StyledCell>
                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('pdReview', index)}>
                    Remove
                  </Button>
                </StyledCell>
              </TableRow>
            )
          )
        }
        <TableRow>
          <StyledCell colSpan="9">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('pdReview')}>
              Add Reviewer
            </Button>
          </StyledCell>
          <StyledCell></StyledCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan="10">
            <Typography className={missingContributors ? classes.missingHeader : classes.header} variant="h3">
              Contributors
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={missingContributors ? classes.missingHeader : classes.header} colSpan="2">Name</TableCell>
          <TableCell className={missingContributors ? classes.missingHeader : classes.header}>Contribution</TableCell>
          <TableCell className={missingContributors ? classes.missingHeader : classes.header} colSpan="2">Affiliation</TableCell>
          <TableCell className={missingContributors ? classes.missingHeader : classes.header} colSpan="2">eMail</TableCell>
          <TableCell className={missingContributors ? classes.missingHeader : classes.header} colSpan="3">ORCID</TableCell>
        </TableRow>
          {
            items.pdContributors.map((item, index) => 
              <TableRow key={index}>
                <StyledCell colSpan="2"><TextField error={cF(item.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.name)} onChange={(e) => setInput(e, index, 'name', 'pdContributors')} /></StyledCell>
                <StyledCell><Contribution /></StyledCell>
                <StyledCell colSpan="2"><TextField fullWidth variant="outlined" value={cF(item.affiliation)} onChange={(e) => setInput(e, index, 'affiliation', 'pdContributors')} /></StyledCell>
                <StyledCell colSpan="2"><TextField fullWidth variant="outlined" value={cF(item.email)} onChange={(e) => setInput(e, index, 'email', 'pdContributors')} /></StyledCell>
                <StyledCell colSpan="2"><TextField fullWidth variant="outlined" value={cF(item.orcid)} onChange={(e) => setInput(e, index, 'orcid', 'pdContributors')} /></StyledCell>
                <StyledCell>
                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('pdContributors', index)}>
                    Remove
                  </Button>
                </StyledCell>
              </TableRow>
            )
          }
        <TableRow>
          <StyledCell colSpan="9">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('pdContributors')}>
              Add Contributor
            </Button>
          </StyledCell>
          <StyledCell>
          </StyledCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
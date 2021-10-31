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
import "react-datetime/css/react-datetime.css";

// Inputs
import TextField from '@material-ui/core/TextField';

// Add contributor
import Button from '@material-ui/core/Button';

// Contribution select (Reviewer)
import ContributionReviewer from './components/ContributionReviewer';

// Status select (Reviewer)
import StatusReviewer from './components/StatusReviewer';

// Contribution select (Contributor)
import Contribution from './components/Contribution';

// Section cell styling
const useStyles = makeStyles((theme) => ({
  header: {
    color: 'white'
  },
  missingHeader: {
    color: 'red'
  },
	missingHeaderOptional: {
		color: 'yellow'
	},
  root: {
    color: 'white'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  }
})(TableCell);

// Notes

// Error states can directl derived from missingName, missingVersion, etc...
// when they are top-level.  The nest fields of Review and Contributors
// derived error state from their individual values, but still update
// the top-level variables pdReview and pdContributors.

// Pass an object and whether or not its keys are properties.
export default function ProvenanceDomain({ items, cF }) {
  
  const classes = useStyles();

  // State for showing missing sections.
  // TODO: For some reason didn't work with [items.pdContributors]

  // State for showing missing sections.
  const [missingProvenanceDomain, setMissingProvenanceDomain] = useState(true);
  const [missingName, setMissingName] = useState(false);
  const [missingVersion, setMissingVersion] = useState(false);
  const [missingLicense, setMissingLicense] = useState(false);
  const [missingReview, setMissingReview] = useState(false);
  const [missingReviewStatus, setMissingReviewStatus] = useState(false);
  const [missingReviewName, setMissingReviewName] = useState(false);
  const [missingReviewContribution, setMissingReviewContribution] = useState(false);
  const [missingContributors, setMissingContributors] = useState(false);
  const [missingContributorsName, setMissingContributorsName] = useState(false);
  const [missingContributorsContribution, setMissingContributorsContribution] = useState(false);

  useEffect(() => {
    
    // Create an OR flag.
    var orFlag = false;
    
    // Name
    if(items.pdName === "") {
      
      // No name.
      setMissingName(true);
      
      // Set the OR flag.
      orFlag = true;

    } else {
      setMissingName(false);
    }
    
    // Version (note the regex check)
    const versionRegex = new RegExp('^[1-9]+\\.[1-9]+[0-9]*$');

    if(items.pdVersion === "" || !(versionRegex.test(items.pdVersion))) {
      
      // No version.
      setMissingVersion(true);
      
      // Set the OR flag.
      orFlag = true;

    } else {
      setMissingVersion(false);
    }

    // License
    if(items.pdLicense === "") {

      // No license.
      setMissingLicense(true);

      // Set the OR flag.
      orFlag = true;

    } else {
      setMissingLicense(false);
    }

    // Review (note that review is not a necessary field
    // in IEEE-2791).
    if(cF(items.pdReview) !== '') {
      
      if(items.pdReview.length === 0) {

        // No review.
        setMissingReview(false);

        // No sub-fields.
        setMissingReviewStatus(false);
        setMissingReviewName(false);
        setMissingReviewContribution(false);

      } else {

        // If there is a review field, we have to consider
        // the necessary subfields.

        // Each field must be treated independently so that
        // our state is compared only to the relevant field.

        // Assume the header is not red.
        setMissingReview(false);

        // Each one of the reviews.
        for(var i = 0; i < items.pdReview.length; i++) {

          // Status
          if(items.pdReview[i].status.length === 0) {
            
            // No status.
            setMissingReviewStatus(true);

            // Header
            setMissingReview(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {
            setMissingReviewStatus(false);
          }

          // Can't rely on orFlag here because fields like
          // Name, Version, and License also depend on it.
          
        }

        for(var reviewCont = 0; reviewCont < items.pdReview.length; reviewCont++) {
          
          // Contribution
          if(items.pdReview[reviewCont].reviewer.contribution.length === 0) {
            
            // No contribution.
            setMissingReviewContribution(true);

            // Header
            setMissingReview(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {
            setMissingReviewContribution(false);
          }

          // Can't rely on orFlag here because fields like
          // Name, Version, and License also depend on it.
          
        }
        
      }
      
    }

    // Each field must be treated independently so that
    // our state is compared only to the relevant field.

    // Contributors are required
    if(items.pdContributors.length === 0) {
      
      // No contributors.
      setMissingContributors(true);

      // No sub-fields.
      setMissingContributorsName(true);
      setMissingContributorsContribution(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there are contributors, we have to consider
      // the necessary subfields.

      // Assume the header is not red.
      setMissingContributors(false);

      // Each one of the contributors.
      for(var contName = 0; contName < items.pdContributors.length; contName++) {

        // Name
        if(items.pdContributors[contName].name === "") {
          
          // No Name.
          setMissingContributorsName(true);

          // Header
          setMissingContributors(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingContributorsName(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }

      // Each one of the contributors.
      for(var contCont = 0; contCont < items.pdContributors.length; contCont++) {
        
        // Contribution        
        if(items.pdContributors[contCont].contribution.length === 0) {
          
          // No contribution.
          setMissingContributorsContribution(true);

          // Header
          setMissingContributors(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingContributorsContribution(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }
      
    }

    // Was one OR the other missing in the pipeline input/output?
    if(orFlag) {
      setMissingProvenanceDomain(true);
    } else {

      // All required fields are ok.
      setMissingReviewStatus(false);
      setMissingReviewName(false);
      setMissingReviewContribution(false);
      setMissingContributorsName(false);
      setMissingContributorsContribution(false);

      setMissingReview(false);
      setMissingContributors(false);
      setMissingProvenanceDomain(false);

    }

  }, [items]);
  

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
    const patternTwo = new RegExp('^[1-9]+\\.$');
    const patternThree = new RegExp('^[1-9]+\\.[1-9]+[0-9]*$');

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

    // Cases
    if(which === 'pdReview') {

      // Cases
      if(inputName === 'reviewer_comment' || inputName === 'date') {

        // Change the value at the given index.
        dummy[i][inputName] = event.target.value;

      } else if(inputName === 'status') {

        // Change the value at the given index.
        dummy[i][inputName] = [event.target.value];

      } else {

        // Need to split up the sub-key.
        const splitUp = inputName.split('.');

        // Change the value at the given index.
        dummy[i][splitUp[0]][splitUp[1]] = event.target.value;

      }
      
      // Update the state.
      items.setPdReview(dummy);
	  console.log('pdModified', items.pdModifed)

    } else if(which == 'pdContributors') {
      
      // Change the value at the given index.
      dummy[i][inputName] = event.target.value;
      
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

      // Review is not required as of IEEE 2791-2020,
      // so add it if it's missing.
      if(cF(items.pdReview) === '') {
        dummy = [];
      }
      
      // Push the new row.
      dummy.push({
        "date": "",
        "status": [],
        "reviewer": {
          "name": "",
          "affiliation": "",
          "email": "",
          "contribution": ["createdBy"]
        },
        "reviewer_comment": ""
      });

      // Update the state.
      items.setPdReview(dummy);

    } else if(which == 'pdContributors') {

      // Push the new row.
      dummy.push({
        "name": "",
        "contribution": ["createdBy"],
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
    if(which === 'pdReview') {

      // Set the state, but only to valid objects
      // since Review isn't required as of IEEE 2791-2020.
      if(dummy.length === 0) {
        
        // Remove the review key completely.
        delete items[which];

      } else {
        console.log('pdReview', dummy)
        // Update the state.
        items.setPdReview(dummy);

      }
      
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
          <StyledCell colSpan="12">
            <Typography className={missingProvenanceDomain ? classes.missingHeader : classes.header} variant="h1">
              Provenance Domain
            </Typography>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={missingName ? classes.missingHeader: classes.header}>
            Name
          </TableCell>
          <StyledCell colSpan="3" noGutter>
            <TextField InputProps={{ className: classes.root }} error={missingName ? true : false} fullWidth id="outlined-basic" value={cF(items.pdName)} onChange={(e) => items.setPdName(e.target.value)} variant="outlined" />
          </StyledCell>
          <TableCell className={missingVersion ? classes.missingHeader: classes.header}>
            Version
          </TableCell>
          <StyledCell noGutter>
            <TextField InputProps={{ className: classes.root }} error={missingVersion ? true : false} fullWidth id="outlined-basic" value={cF(items.pdVersion)} onChange={(e) => checkSemanticVersioning(e.target.value)} variant="outlined" />
          </StyledCell>
          <TableCell className={missingLicense ? classes.missingHeader: classes.header}>
            License
          </TableCell>
          <StyledCell colSpan="4" noGutter>
            <TextField InputProps={{ className: classes.root }} error={missingLicense ? true : false} fullWidth id="outlined-basic" value={cF(items.pdLicense)} onChange={(e) => items.setPdLicense(e.target.value)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            Derived From
          </StyledCell>
          <StyledCell colSpan="10" noGutter>
            <TextField InputProps={{ className: classes.root }} fullWidth id="outlined-basic" value={cF(items.pdDerivedFrom)} onChange={(e) => items.setPdDerivedFrom(e.target.value)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
        </TableRow>
        <TableRow>
          <StyledCell>
            Created
          </StyledCell>
          <StyledCell noGutter>
            <TextField InputProps={{ className: classes.root }} disabled label={items.pdCreated.toString()} fullWidth id="outlined-basic" />
          </StyledCell>
          <StyledCell>
            Modified
          </StyledCell>
          <StyledCell noGutter>
            <TextField InputProps={{ className: classes.root }} disabled label={items.pdModifed} fullWidth id="outlined-basic" />
          </StyledCell>
          <StyledCell>
            Obsolete After
          </StyledCell>
          <StyledCell noGutter>
            <TextField InputProps={{ className: classes.root }} label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(items.pdObsoleteAfter)} onChange={(e) => items.setPdObsoleteAfter(e.target.value)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="5">
            <Typography className={classes.header} variant="h3">
              Embargo
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            Start Time
          </StyledCell>
          <StyledCell noGutter>
            <TextField InputProps={{ className: classes.root }} label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(items.pdEmbargoStartTime)} onChange={(e) => items.setPdEmbargoStartTime(e.target.value)} variant="outlined" />
          </StyledCell>
          <StyledCell>
            Embargo End Time
          </StyledCell>
          <StyledCell noGutter>
            <TextField InputProps={{ className: classes.root }} label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(items.pdEmbargoEndTime)} onChange={(e) => items.setPdEmbargoEndTime(e.target.value)} variant="outlined" />
          </StyledCell>
          <StyledCell>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="10">
            <Typography className={missingReview ? classes.missingHeaderOptional : classes.header} variant="h3">
              Review
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>Date</StyledCell>
          <TableCell className={missingReviewStatus ? classes.missingHeaderOptional : classes.header}>Status</TableCell>
          <TableCell className={missingReviewName ? classes.missingHeaderOptional : classes.header}>Reviewer Name</TableCell>
          <TableCell className={missingReviewContribution ? classes.missingHeaderOptional : classes.header}>Reviewer Contribution</TableCell>
          <StyledCell>Reviewer Affiliation</StyledCell>
          <StyledCell>Reviewer e-Mail</StyledCell>
          <StyledCell>Reviewer ORCID</StyledCell>
          <StyledCell colSpan="4">Reviewer Comment</StyledCell>
        </TableRow>
        {
          cF(items.pdReview) !== ''
            ?
              items.pdReview.map((item, index) => (
                  <TableRow key={index}>
                    <StyledCell>
                      <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.date)} onChange={(e) => setInput(e, index, 'date', 'pdReview')} />
                    </StyledCell>
                    <StyledCell>
                      <StatusReviewer error={item.status.length === 0 ? true : false} item={ item } index={ index } setInput={ setInput } />
                    </StyledCell>
                    <StyledCell>
                      <TextField InputProps={{ className: classes.root }} error={item.reviewer.name === "" ? true : false} fullWidth variant="outlined" value={cF(item.reviewer.name)} onChange={(e) => setInput(e, index, 'reviewer.name', 'pdReview')} />
                    </StyledCell>
                    <StyledCell>
                      <ContributionReviewer error={item.reviewer.contribution.length === 0 ? true : false} item={ item.reviewer } index={ index } setInput={ setInput } />
                    </StyledCell>
                    <StyledCell>
                      <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.reviewer.affiliation)} onChange={(e) => setInput(e, index, 'reviewer.affiliation', 'pdReview')} />
                    </StyledCell>
                    <StyledCell>
                      <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.reviewer.email)} onChange={(e) => setInput(e, index, 'reviewer.email', 'pdReview')} />
                    </StyledCell>
                    <StyledCell>
                      <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.reviewer.orcid)} onChange={(e) => setInput(e, index, 'reviewer.orcid', 'pdReview')} />
                    </StyledCell>
                    <StyledCell colSpan="3">
                      <TextField InputProps={{ className: classes.root }} fullWidth multiline variant="outlined" value={cF(item.reviewer.comment)} onChange={(e) => setInput(e, index, 'reviewer.comment', 'pdReview')} rows={4} />
                    </StyledCell>
                    <StyledCell>
                      <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('pdReview', index)}>
                        Remove
                      </Button>
                    </StyledCell>
                  </TableRow>
                )
              )
            :
              null
        }
        <TableRow>
          <StyledCell colSpan="10">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('pdReview')}>
              Add Reviewer
            </Button>
          </StyledCell>
          <StyledCell></StyledCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan="11">
            <Typography className={missingContributors ? classes.missingHeader : classes.header} variant="h3">
              Contributors
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={missingContributorsName ? classes.missingHeader : classes.header} colSpan="2">Name</TableCell>
          <TableCell className={missingContributorsContribution ? classes.missingHeader : classes.header}>Contribution</TableCell>
          <TableCell colSpan="2" className={classes.header}>Affiliation</TableCell>
          <TableCell colSpan="2" className={classes.header}>eMail</TableCell>
          <TableCell colSpan="4" className={classes.header}>ORCID</TableCell>
        </TableRow>
          {
            items.pdContributors.map((item, index) => 
              <TableRow key={index}>
                <StyledCell colSpan="2">
                  <TextField InputProps={{ className: classes.root }} error={cF(item.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.name)} onChange={(e) => setInput(e, index, 'name', 'pdContributors')} />
                </StyledCell>
                <StyledCell>
                  <Contribution error={item.contribution.length === 0 ? true : false} item={ item } index={ index } setInput={ setInput } />
                </StyledCell>
                <StyledCell colSpan="2">
                  <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.affiliation)} onChange={(e) => setInput(e, index, 'affiliation', 'pdContributors')} />
                </StyledCell>
                <StyledCell colSpan="2">
                  <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.email)} onChange={(e) => setInput(e, index, 'email', 'pdContributors')} />
                </StyledCell>
                <StyledCell colSpan="3">
                  <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.orcid)} onChange={(e) => setInput(e, index, 'orcid', 'pdContributors')} />
                </StyledCell>
                <StyledCell>
                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('pdContributors', index)}>
                    Remove
                  </Button>
                </StyledCell>
              </TableRow>
            )
          }
        <TableRow>
          <StyledCell colSpan="10">
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
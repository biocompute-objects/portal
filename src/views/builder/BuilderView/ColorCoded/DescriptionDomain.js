import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// For input_list and output_list.
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// Inputs
import TextField from '@material-ui/core/TextField';

// Add step
import Button from '@material-ui/core/Button'

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

// Pass an object.
/*export default function DescriptionDomain({ addRows, removeRows, descriptionKeywords, items, cF }) {*/
export default function DescriptionDomain({ compCheck, checkBlank, items, cF }) {
  
  console.log('@@@@@@@@@@@@', items);
  
  const classes = useStyles();

  // State for showing missing sections.
  const [missingDescriptionDomain, setMissingDescriptionDomain] = useState(true);
  const [missingKeywords, setMissingKeywords] = useState(false);
  const [missingSteps, setMissingSteps] = useState(false);
  const [missingStepsNumber, setMissingStepsNumber] = useState(false);
  const [missingStepsName, setMissingStepsName] = useState(false);
  const [missingStepsDescription, setMissingStepsDescription] = useState(false);
  const [missingStepsInputUri, setMissingStepsInputUri] = useState(false);
  const [missingStepsOutputUri, setMissingStepsOutputUri] = useState(false);

  useEffect(() => {
    
    // Create an OR flag.
    var orFlag = false;
    
    // Keywords
    if(items.ddKeywords[0] === "") {
      
      // No keywords
      setMissingKeywords(true);
      
      // Set the OR flag.
      orFlag = true;

    } else {
      setMissingKeywords(false);
    }
    
    // Pipeline steps
    
    // Each field must be treated independently so that
    // our state is compared only to the relevant field.

    // Pipeline steps are required
    if(items.ddPipelineSteps.length == 0) {
      
      // No pipeline steps.
      setMissingSteps(true);

      // No sub-fields.
      setMissingStepsNumber(true);
      setMissingStepsName(true);
      setMissingStepsDescription(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there are pipeline steps, we have to consider
      // the necessary subfields.

      // Assume the header is not red.
      setMissingSteps(false);

      // We have at least one step by default.
      setMissingStepsNumber(false);

      // Each one of the pipeline steps.
      for(var i = 0; i < items.ddPipelineSteps.length; i++) {

        // Name
        if(items.ddPipelineSteps[i].name === "") {
          
          // No Name.
          setMissingStepsName(true);

          // Header
          setMissingSteps(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingStepsName(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }

      // Each one of the pipeline steps.
      for(var i = 0; i < items.ddPipelineSteps.length; i++) {
        
        // Description        
        if(items.ddPipelineSteps[i].description === "") {
          
          // No description.
          setMissingStepsDescription(true);

          // Header
          setMissingSteps(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingStepsDescription(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }
      
    }

    // Each input list of each step.
    for(var i = 0; i < items.ddPipelineSteps.length; i++) {

      if(items.ddPipelineSteps[i].input_list.length === 0) {
        
        // No input list.
        setMissingStepsInputUri(true);

        // Header
        setMissingSteps(true);
        
        // Set the OR flag.
        orFlag = true;

        break;

      } else {

        // We have an input list, but do we have URIs?
        for(var j = 0; j < items.ddPipelineSteps[i].input_list.length; j++) {
          if(items.ddPipelineSteps[i].input_list[j]['uri']['uri'] === "") {
            
            // No URI.
            setMissingStepsInputUri(true);

            // Header
            setMissingSteps(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {

            setMissingStepsInputUri(false);

          }

        }
        
      }
      
    }

    // Each output list of each step.
    for(var i = 0; i < items.ddPipelineSteps.length; i++) {
      if(items.ddPipelineSteps[i].output_list.length === 0) {
        
        // No URI.
        setMissingStepsOutputUri(true);

        // Header
        setMissingSteps(true);
        
        // Set the OR flag.
        orFlag = true;

        break;

      } else {

        // We have an output list, but do we have URIs?
        for(var j = 0; j < items.ddPipelineSteps[i].output_list.length; j++) {
          if(items.ddPipelineSteps[i].output_list[j]['uri']['uri'] === "") {
            
            // No URI.
            setMissingStepsOutputUri(true);

            // Header
            setMissingSteps(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {

            setMissingStepsOutputUri(false);

          }

        }

      }
    }

    // Was one OR the other missing in the pipeline input/output?
    if(orFlag) {
      setMissingDescriptionDomain(true);
    } else {

      // All required fields are ok.
      setMissingStepsName(false);
      setMissingStepsDescription(false);
      
      setMissingSteps(false);
      setMissingDescriptionDomain(false);

    }

  }, [items]);

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based 
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInput = (event, i, inputName) => {
    
    // Get the state variable.
    var dummy = items.ddPipelineSteps;

    // Change the value at the given index.
    dummy[i][inputName] = event.target.value;

    // Update the state.
    items.setDdPipelineSteps(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }

  const setListInput = (event, i, listtype, j, inputName) => {

    // Get the state variable.
    var dummy = items.ddPipelineSteps;

    // Change the value at the given index AND sub-index.

    // Special rule for URI.
    if(inputName == 'uri') {
      dummy[i][listtype][j][inputName]['uri'] = event.target.value;
    } else {
      dummy[i][listtype][j][inputName] = event.target.value;
    }
    

    // Update the state.
    items.setDdPipelineSteps(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }
  
  // Add a row
  const addRows = () => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = items.ddPipelineSteps;

    // Push the new row.
    dummy.push({
      "step_number": "",
      "name": "",
      "description": "",
      "input_list": [],
      "output_list": []
    });

    // Update the state.
    items.setDdPipelineSteps(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row
  const removeRows = (which) => {

    // Get the state variable.
    var dummy = items.ddPipelineSteps;

    // Remove the index.
    dummy.splice(which, 1);

    // Update the state.
    items.setDdPipelineSteps(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Add a row
  const addListRows = (which, listtype) => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
    var dummy = items.ddPipelineSteps;

    // Push the new row.
    dummy[which][listtype].push({
      "uri": {"uri": ""},
      "filename": "",
      "access_time": "",
      "sha1_checksum": ""
    });

    // Update the state.
    items.setDdPipelineSteps(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row
  const removeListRows = (which, subwhich, listtype) => {

    // Get the state variable.
    var dummy = items.ddPipelineSteps;

    // Remove the index.
    dummy[which][listtype].splice(subwhich, 1);

    // Update the state.
    items.setDdPipelineSteps(dummy);

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }


  // Arguments
  // ---------
  // items: JSON object (Description Domain)

  
  // ----- Meta Information ----- //

  
  // Keywords
  
  // Collapse the keywords to a string.
  //const keywords = items.keywords.join(', ');


  // ----- Processing ----- //
  

  // None.


  // ----- Description ----- //

  return(
    <Table size="small">
    <TableHead className={classes.tabled}>
      <TableRow>
        <StyledCell colSpan="5">
          <Typography className={missingDescriptionDomain ? classes.missingHeader : classes.header} variant="h1">
            Description Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <Typography className={missingKeywords ? classes.missingHeader : classes.header} variant="h3">
            Keywords
          </Typography>
        </TableCell>
        <StyledCell colspan="4">
          <TextField error={missingKeywords ? true : false} fullWidth variant="outlined" value={cF(items.ddKeywords)} onChange={(e) => items.setDdKeywords([e.target.value])} />
        </StyledCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan="5">
          <Typography className={missingSteps ? classes.missingHeader : classes.header} variant="h3">
            Steps
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography className={missingStepsNumber ? classes.missingHeader : classes.header}>
            Step Number
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingStepsName ? classes.missingHeader : classes.header}>
            Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingStepsDescription ? classes.missingHeader : classes.header}>
            Description
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingStepsInputUri ? classes.missingHeader : classes.header}>
            Input List
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingStepsOutputUri ? classes.missingHeader : classes.header}>
            Output List
          </Typography>
        </TableCell>
      </TableRow>
      {
        items.ddPipelineSteps.map((item, index) => (
            <TableRow key={index}>
              <StyledCell className={classes.stepNumber}><TextField variant="outlined" value={index+1} />{compCheck}</StyledCell>
              <StyledCell>
                <TextField error={cF(item.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.name)} onChange={(e) => setInput(e, index, 'name')} />
              </StyledCell>
              <StyledCell>
                <TextField error={cF(item.description) === "" ? true : false} variant="outlined" multiline rows={4} value={cF(item.description)} onChange={(e) => setInput(e, index, 'description')} />
              </StyledCell>
              <StyledCell>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={missingStepsInputUri ? classes.missingHeader : classes.header} variant="h3">
                    Show Inputs
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {
                        item.input_list.map((subitem, subindex) => (
                          <>
                            <ListItem>
                              <TextField label={'Filename'} fullWidth variant="outlined" value={cF(subitem.filename)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'filename')} />
                            </ListItem>
                            <ListItem>
                              <TextField error={cF(subitem.uri.uri) === "" ? true : false} label={'URI'} fullWidth variant="outlined" value={cF(subitem.uri.uri)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'uri')} />
                            </ListItem>
                            <ListItem>
                              <TextField label={'Access Time'} fullWidth variant="outlined" value={cF(subitem.access_time)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'access_time')} />
                            </ListItem>
                            <ListItem>
                              <TextField label={'SHA1 Checksum'} fullWidth variant="outlined" value={cF(subitem.sha1_checksum)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'sha1_checksum')} />
                            </ListItem>
                            {
                              subindex !== item.input_list.length-1
                                ?
                                  <ListItem>
                                    <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'input_list')}>
                                      Remove
                                    </Button>
                                  </ListItem>
                                :
                                  <ListItem divider>
                                    <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'input_list')}>
                                      Remove
                                    </Button>
                                  </ListItem>
                            }
                          </>
                          )
                        )
                      }
                      <ListItem>
                        <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addListRows(index, 'input_list')}>
                          Add Input
                        </Button>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </StyledCell>
              <StyledCell>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={missingStepsOutputUri ? classes.missingHeader : classes.header} variant="h3">
                    Show Outputs
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {
                        item.output_list.map((subitem, subindex) => (
                          <>
                            <ListItem>
                              <TextField label={'Filename'} fullWidth variant="outlined" value={cF(subitem.filename)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'filename')} />
                            </ListItem>
                            <ListItem>
                              <TextField error={cF(subitem.uri.uri) === "" ? true : false} label={'URI'} fullWidth variant="outlined" value={cF(subitem.uri.uri)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'uri')} />
                            </ListItem>
                            <ListItem>
                              <TextField label={'Access Time'} fullWidth variant="outlined" value={cF(subitem.access_time)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'access_time')} />
                            </ListItem>
                            <ListItem>
                              <TextField label={'SHA1 Checksum'} fullWidth variant="outlined" value={cF(subitem.sha1_checksum)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'sha1_checksum')} />
                            </ListItem>
                            {
                              subindex !== item.output_list.length-1
                                ?
                                  <ListItem>
                                    <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'output_list')}>
                                      Remove
                                    </Button>
                                  </ListItem>
                                :
                                  <ListItem divider>
                                    <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'output_list')}>
                                      Remove
                                    </Button>
                                  </ListItem>
                            }
                          </>
                          )
                        )
                      }
                      <ListItem>
                        <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addListRows(index, 'output_list')}>
                          Add Output
                        </Button>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </StyledCell>
              <StyledCell>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows(index)}>
                  Remove
                </Button>
              </StyledCell>
            </TableRow>
          )
        )
      }
      <TableRow>
        <StyledCell colSpan="5">
          <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows()}>
            Add Step
          </Button>
        </StyledCell>
      </TableRow>
    </TableBody>
  </Table>
  );
}
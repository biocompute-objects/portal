import React, { useEffect, useState } from 'react';
import {
  withStyles, Typography
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

// For links.
import LinkerInList from './components/LinkerInList'

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  }
})(TableCell);

// Pass an object.
/*export default function DescriptionDomain({ addRows, removeRows, descriptionKeywords, items, cF }) {*/
export default function DescriptionDomain({ compCheck, checkBlank, items, cF }) {
  
  //console.log('@@@@@@@@@@@@', items);
  
  const classes = withStyles();

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
    dummy[i][listtype][j][inputName] = event.target.value;

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
      "uri": "",
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
          <Typography variant="h3">
            Description Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <StyledCell>
          Keywords
        </StyledCell>
        <StyledCell colspan="4">
          <TextField fullWidth variant="outlined" value={items.ddKeywords} />
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="5">
          Steps
        </StyledCell>
      </TableRow>
      <TableRow>
        {
          ['Step Number', 'Name', 'Description', 'Input List', 'Output List'].map(item => (
              <StyledCell>
                {item}
              </StyledCell>
            )
          )
        }
      </TableRow>
      {
        items.ddPipelineSteps.map((item, index) => (
            <TableRow key={index}>
              <StyledCell className={classes.stepNumber}><TextField variant="outlined" value={index+1} />{compCheck}</StyledCell>
              <StyledCell><TextField error={cF(item.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.name)} onChange={(e) => setInput(e, index, 'name')} /></StyledCell>
              <StyledCell><TextField error={cF(item.description) === "" ? true : false} variant="outlined" multiline rows={4} value={cF(item.description)} onChange={(e) => setInput(e, index, 'description')} /></StyledCell>
              <StyledCell>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography>Show Inputs</Typography>
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
                  <Typography>Show Outputs</Typography>
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
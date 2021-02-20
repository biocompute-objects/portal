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

// Inputs
import TextField from '@material-ui/core/TextField';

// Add step
import Button from '@material-ui/core/Button'

// For links.
import LinkerInList from './components/LinkerInList'

// Cell styling
const StyledCell = withStyles({
  root: {
    border: '1px solid black',
    color: 'white'
  }
})(TableCell);

// Pass an object.
export default function DescriptionDomain({ items, cF }) {
  
  const classes = withStyles();

  // State
  const [rows, setRows] = useState(items.pipeline_steps);

  // Couldn't get the re-render to work without this.
  const [rerender, setRerender] = useState(0);

  // Remove row
  const removeRows = (which) => {

    // Remove based on the which (index).
    /*console.log('which: ', which)
    console.log('row_pre_delete: ', rows)
    rows.splice(which, 1);
    //console.log('row_delete: ', spliced)

    setRows(rows)

    setRerender(rerender+1)
    console.log('rerender', rerender)*/

    var dummy = rows;
    dummy.splice(which, 1);
    setRows(dummy)

    setRerender(rerender+1)

  }
  
  // Add row
  const addRows = () => {

    // For some reason we can't have the push
    // call inside of setRows.
    var dummy = rows;
    dummy.push(
      {
        "step_number": "",
        "number": "",
        "name": "",
        "description": "",
        "input_list": "",
        "output_list": ""
      }
    )
    setRows(dummy)

    setRerender(rerender+1)
    console.log('rerender', rerender)
    
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
  console.log(':::::', items)


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
          <TextField fullWidth variant="outlined" value={items.keywords} />
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
        rows.map((item, index) => (
            <TableRow key={index}>
              <StyledCell className={classes.stepNumber}><TextField variant="outlined" value={index+1} /></StyledCell>
              <StyledCell><TextField fullWidth variant="outlined" defaultValue={item.name} /></StyledCell>
              <StyledCell><TextField variant="outlined" defaultValue={item.description} multiline rows={4}/></StyledCell>
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
                      <LinkerInList color={ 'blackLink' } uri={ 'https://source1.com' } />
                      <Typography>&nbsp;+ Add Input</Typography>
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
                      <LinkerInList color={ 'blackLink' } uri={ 'https://source1.com' } />
                      <Typography>&nbsp;+ Add Output</Typography>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </StyledCell>
              <StyledCell>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows(index)}>
                  Remove {index}
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
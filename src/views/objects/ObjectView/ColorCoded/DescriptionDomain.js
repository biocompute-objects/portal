import React from 'react';
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

// For links.
import LinkerInList from './components/LinkerInList'

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'white'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object.
export default function DescriptionDomain({ items }) {
  
  const classes = withStyles();

  // Arguments
  // ---------
  // items: JSON object (Description Domain)


  // ----- Meta Information ----- //

  
  // Keywords
  
  // Collapse the keywords to a string.
  const keywords = items.keywords.join(', ');


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
        <StyledCell colSpan="4">
          {keywords}
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
          items.pipeline_steps.map(item => (
              <TableRow>
                <StyledCell>{item.step_number}</StyledCell>
                <StyledCell>{item.name}</StyledCell>
                <StyledCell>{item.description}</StyledCell>
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
                              item.input_list.map(subitem => (
                                <LinkerInList color={ 'blackLink' } uri={ subitem.uri.uri } />
                            )
                          )
                        }
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
                              item.output_list.map(subitem => (
                                <LinkerInList color={ 'blackLink' } uri={ subitem.uri.uri } />
                            )
                          )
                        }
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </StyledCell>
              </TableRow>
            )
          )
        }
    </TableBody>
  </Table>
  );
}
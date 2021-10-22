// src/views/builder/BuilderView/ColorCoded/DescriptionDomain.js 

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
  fullWidthList: {
    width: '100%'
  },
  header: {
    color: 'black'
  },
  missingHeader: {
    color: 'red'
  },
	missingHeaderOptional: {
		color: 'yellow'
	},
  root: {
    color: 'black'
  },
  stepNumber: {
    width: '8%'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  }
})(TableCell);

// Pass an object.
/*export default function DescriptionDomain({ addRows, removeRows, descriptionKeywords, items, cF }) {*/
export default function DescriptionDomain({ compCheck, checkBlank, items, cF }) {
  
  const classes = useStyles();
  
  // State for showing missing sections.
  const [missingDescriptionDomain, setMissingDescriptionDomain] = useState(true);
  const [missingKeywords, setMissingKeywords] = useState(false);
  const [missingXref, setMissingXref] = useState(false);
  const [missingXrefNamespace, setMissingXrefNamespace] = useState(false);
  const [missingXrefName, setMissingXrefName] = useState(false);
  const [missingXrefId, setMissingXrefId] = useState(false);

	// Special state variable required because of nested structure.
	const [missingXrefIdIndex, setMissingXrefIdIndex] = useState([]);

  const [missingXrefAccessTime, setMissingXrefAccessTime] = useState(false);
  const [missingSteps, setMissingSteps] = useState(false);
  const [missingStepsNumber, setMissingStepsNumber] = useState(false);
  const [missingStepsName, setMissingStepsName] = useState(false);
  const [missingStepsDescription, setMissingStepsDescription] = useState(false);
  const [missingStepsVersion, setMissingStepsVersion] = useState(false);
  const [missingStepsInputUri, setMissingStepsInputUri] = useState(false);
  const [missingStepsOutputUri, setMissingStepsOutputUri] = useState(false);
  const [missingStepsPrerequisite, setMissingStepsPrerequisite] = useState(false);

  useEffect(() => {
    console.log('dummy', items)
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

    // Xref (note that xref is not a necessary field
    // in IEEE-2791).
    if(cF(items.ddXref) !== '') {
      
      if(items.ddXref.length == 0) {

        // No Xref.
        setMissingXref(false);

        // No sub-fields.
        setMissingXrefNamespace(false);
        setMissingXrefName(false);
        setMissingXrefId(false);
        setMissingXrefAccessTime(false);

      } else {

        // If there is an Xref field, we have to consider
        // the necessary subfields.

        // Each field must be treated independently so that
        // our state is compared only to the relevant field.

        // Assume the header is not red.
        setMissingXref(false);

        // Each one of the Xrefs.        
        for(var i = 0; i < items.ddXref.length; i++) {
          
          // Namespace
          if(items.ddXref[i].namespace === "") {
            
            // No namespace.
            setMissingXrefNamespace(true);

            // Header
            setMissingXref(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {
            setMissingXrefNamespace(false);
          }
          
        }

        // Each one of the Xrefs.        
        for(var i = 0; i < items.ddXref.length; i++) {
          
          // Name
          if(items.ddXref[i].name === "") {
            
            // No name.
            setMissingXrefName(true);

            // Header
            setMissingXref(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {
            setMissingXrefName(false);
          }
          
        }

        // Each one of the Xrefs.
				
		// Note the double for loop because of the nested structure of the IDs.
        for(var i = 0; i < items.ddXref.length; i++) {

					// Do we have any IDs?
					if(items.ddXref[i].ids[0] === "") {
        
						// No IDs.
						setMissingXrefId(true);
		
						// Header
						setMissingXref(true);
						
						// Set the OR flag.
						orFlag = true;
		
						break;
		
					} else {

							for(var j = 0; j < items.ddXref[i].ids.length; j++) {
								
								// IDs
								if(items.ddXref[i].ids[j] === "") {
									console.log('here')						
									// No IDs *for this record*.
									setMissingXrefId(true);

									// Get the existing state value.
									var existingState = missingXrefIdIndex;

									// Append the state.
									existingState.push(j);

									// Set the state.
									setMissingXrefIdIndex(existingState);

									// Header
									setMissingXref(true);

									// Set the OR flag.
									orFlag = true;
									
									// No break here because we need to inspect
									// each sub-list of IDs.

								} else {
									
									// This MUST depend on the OR flag because
									// the loop will keep running to find individual
									// ID fields that are broken.
									setMissingXrefId(false);
									setMissingXrefIdIndex([]);
									
								}

						}
					
					}

        }

        // Each one of the Xrefs.        
        for(var i = 0; i < items.ddXref.length; i++) {
          
          // Access time
          if(items.ddXref[i].access_time === "") {
            
            // No access time.
            setMissingXrefAccessTime(true);

            // Header
            setMissingXref(true);

            // Set the OR flag.
            orFlag = true;

            break;

          } else {
            setMissingXrefAccessTime(false);
          }
          
        }
        
      }
      
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
          if(items.ddPipelineSteps[i].input_list[j]['uri'] === "") {
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
          if(items.ddPipelineSteps[i].output_list[j]['uri'] === "") {

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

    // Each prerequisite of each step.
    for(var i = 0; i < items.ddPipelineSteps.length; i++) {

      if(!items.ddPipelineSteps[i].prerequisite) {
        
        // No input list.
        setMissingStepsPrerequisite(true);

        break;
    }  else {
        setMissingStepsPrerequisite(false);
     }
  }


  }, [items]);

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based 
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInput = (event, i, inputName, which) => {
    
    // Get the state variable.
    var dummy = items[which];

    // TODO: Put in date-time logic...
		
		// Cases
    if(which === 'ddXref') {

      // Change the value at the given index.
			dummy[i][inputName] = event.target.value;
      
      // Update the state.
      items.setDdXref(dummy);

    } else if(which == 'ddPipelineSteps') {
			
			// Change the value at the given index.
      dummy[i][inputName] = event.target.value;
      
      // Update the state.
      items.setDdPipelineSteps(dummy);

    }

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }

  const setListInput = (event, i, listtype, j, inputName) => {

    // Get the state variable.
		var dummy = '';

		if(listtype === 'ids') {
			dummy = items.ddXref;
		} else {
			dummy = items.ddPipelineSteps;
		}

    // Special rule for URI.
    dummy[i][listtype][j][inputName] = event.target.value;
	console.log('dummy 516', dummy, event.target, dummy[i][listtype])
		// Update the state.
	if(listtype === 'ids') {
		items.setDdXref(dummy);
	} else {
		items.setDdPipelineSteps(dummy);
	}

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }
  
  // Add a row
  const addRows = (which) => {

    // Get the state variable.
    var dummy = items[which];

    // Cases
    if(which == 'ddXref') {

      // Xref is not required as of IEEE 2791-2020,
      // so add it if it's missing.
      if(cF(items.ddXref) === '') {
        dummy = [];
      }
      
      // Push the new row.
      dummy.push({
        "namespace": "",
        "name": "",
        "ids": [""],
        "access_time": ""
      });

      // Update the state.
      items.setDdXref(dummy);

    } else if(which == 'ddPipelineSteps') {
			
			// The step number is determined by how many
			// rows we already have.
			const stepNumber = items.ddPipelineSteps.length - 1;
			
			// Push the new row.
      dummy.push({
        "step_number": stepNumber,
        "name": "",
        "description": "",
			"prerequisite": [{"name": "","uri":{}}],
			"input_list": [{}],
			"output_list": [{}]
      });
	  console.log('dummy', dummy)

      // Update the state.
      items.setDdPipelineSteps(dummy);

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
    if(which === 'ddXref') {

      // Set the state, but only to valid objects
      // since Xref isn't required as of IEEE 2791-2020.
      if(dummy.length === 0) {
        
        // Remove the review key completely.
        delete items[which];

      } else {

        // Update the state.
        items.setDdXref(dummy);

      }
      
    } else if(which == 'ddPipelineSteps') {

      // Update the state.
      console.log('asdfffffffffffffff')
      items.setDdPipelineSteps(dummy);

    }
    
    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Add a row
  const addListRows = (which, listtype) => {

    // For some reason we can't have the push
    // call inside of setRows.

    // Get the state variable.
		var dummy = '';

		if(listtype === 'ids') {
			
			dummy = items.ddXref;

			// Push the new row.
			dummy[which][listtype].push("");
	
			// Update the state.
			items.setDdXref(dummy);

		} else if (listtype === 'prerequisite') {
			dummy = items.ddPipelineSteps;
			dummy[which]["prerequisite"] = {
				"prerequisite": [
					{
						"name": "",
						 "uri":{
							"uri": "",
							"filename": "",
							"access_time": "",
							"sha1_checksum": ""}
					}
				]
			};
			
			// Push the new row.
			// dummy[which].push(prereq);
			console.log('dummy 657', dummy[which], dummy)	
			// Update the state.
			items.setDdPipelineSteps(dummy);
		} else {

			dummy = items.ddPipelineSteps;

			// Push the new row.
			dummy[which][listtype].push({
				"uri": "",
				"filename": "",
				"access_time": "",
				"sha1_checksum": ""
			});
	
			// Update the state.
			items.setDdPipelineSteps(dummy);

		}

    // Needed to re-render the page.
    items.setRerender(items.rerender+1)

  }

  // Remove a row
  const removeListRows = (which, subwhich, listtype) => {

    // Get the state variable.
		var dummy = '';

		if(listtype === 'ids') {
			
			dummy = items.ddXref;

			// Remove the index.
			dummy[which][listtype].splice(subwhich, 1);
	
			// Update the state.
			items.setDdXref(dummy);

		} else {

			dummy = items.ddPipelineSteps;

			// Remove the index.
			dummy[which][listtype].splice(subwhich, 1);
	
			// Update the state.
			items.setDdPipelineSteps(dummy);

		}

    // Needed to re-render the page.
    items.setRerender(items.rerender+1);

  }

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
        <StyledCell>
          <TextField InputProps={{ className: classes.root }} error={missingKeywords ? true : false} fullWidth variant="outlined" value={cF(items.ddKeywords)} onChange={(e) => items.setDdKeywords([e.target.value])} />
        </StyledCell>
        <TableCell>
          <Typography variant="h3">
            Platform
          </Typography>
        </TableCell>
        <StyledCell>
          <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(items.ddPlatform)} onChange={(e) => items.setDdPlatform([e.target.value])} />
        </StyledCell>
        <TableCell>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan="5">
          <Typography className={missingXref ? classes.missingHeaderOptional : classes.header} variant="h3">
            Xref
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography className={missingXrefNamespace ? classes.missingHeaderOptional : classes.header}>
            Namespace
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingXrefName ? classes.missingHeaderOptional : classes.header}>
            Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingXrefId ? classes.missingHeaderOptional : classes.header}>
            IDs
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={missingXrefAccessTime ? classes.missingHeaderOptional : classes.header}>
            Access Time
          </Typography>
        </TableCell>
        <TableCell>
        </TableCell>
      </TableRow>
      {
        cF(items.ddXref) !== ''
          ?
						items.ddXref.map((item, index) => (
								<TableRow key={index}>
									<StyledCell>
										<TextField InputProps={{ className: classes.root }} error={cF(item.namespace) === "" ? true : false} fullWidth variant="outlined" value={cF(item.namespace)} onChange={(e) => setInput(e, index, 'namespace', 'ddXref')} />
									</StyledCell>
									<StyledCell>
										<TextField InputProps={{ className: classes.root }} error={cF(item.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.name)} onChange={(e) => setInput(e, index, 'name', 'ddXref')} />
									</StyledCell>
									<StyledCell>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
											<Typography className={missingXrefIdIndex.indexOf(index) !== -1 ? classes.missingHeader : classes.header} variant="h3">
												Show IDs
											</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<List className={classes.fullWidthList}>
													{
														item.ids.map((subitem, subindex) => (
																<>
																	<ListItem>
																		<TextField InputProps={{ className: classes.root }} error={cF(subitem) === "" ? true : false} label={'ID'} fullWidth variant="outlined" value={cF(subitem)} onChange={(e) => setListInput(e, index, 'ids', subindex, 'id')} />
																	</ListItem>
																	{
																		subindex !== item.ids.length-1
																			?
																				<ListItem>
																					<Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'ids')}>
																						Remove
																					</Button>
																				</ListItem>
																			:
																				<ListItem divider>
																					<Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'ids')}>
																						Remove
																					</Button>
																				</ListItem>
																	}
																</>
															)
														)
													}
													<ListItem>
														<Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addListRows(index, 'ids')}>
															Add ID
														</Button>
													</ListItem>
												</List>
											</AccordionDetails>
										</Accordion>
									</StyledCell>
									<StyledCell>
										<TextField InputProps={{ className: classes.root }} error={cF(item.access_time) === "" ? true : false} label={"YYYY-MM-DDTHH:MM:SS+HH:MM"} fullWidth id="outlined-basic" value={cF(item.access_time)} onChange={(e) => setInput(e, index, 'access_time', 'ddXref')} variant="outlined" />
									</StyledCell>
									<StyledCell>
										<Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('ddXref', index)}>
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
        <StyledCell colSpan="4">
          <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('ddXref')}>
            Add Xref
          </Button>
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
          <Typography className={missingStepsVersion ? classes.missingHeader : classes.header}>
            Version
          </Typography>
        </TableCell>
        <TableCell>
        </TableCell>
      </TableRow>
      {
        items.ddPipelineSteps.map((item, index) => (
            <>
      <TableRow key={index}>
              <TableCell className={classes.stepNumber} rowSpan="2">
                <TextField InputProps={{ className: classes.root }} variant="outlined" value={index+1} />
              </TableCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} error={cF(item.name) === "" ? true : false} fullWidth variant="outlined" value={cF(item.name)} onChange={(e) => setInput(e, index, 'name', 'ddPipelineSteps')} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} error={cF(item.description) === "" ? true : false} fullWidth variant="outlined" multiline rows={4} value={cF(item.description)} onChange={(e) => setInput(e, index, 'description', 'ddPipelineSteps')} />
              </StyledCell>
              <StyledCell>
                <TextField InputProps={{ className: classes.root }} fullWidth variant="outlined" value={cF(item.version)} onChange={(e) => setInput(e, index, 'version', 'ddPipelineSteps')} />
              </StyledCell>
              <StyledCell>
                <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('ddPipelineSteps', index)}>
                  Remove
                </Button>
              </StyledCell>
            </TableRow>
			<TableRow key={index}>
              <StyledCell>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={missingStepsOutputUri ? classes.missingHeader : classes.header} variant="h3">
                    Show Prerequisites
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
					{
						missingStepsPrerequisite
						? (
				                  <List className={classes.fullWidthList}>
				                    <ListItem>
				                      <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addListRows(index, 'prerequisite')}>
				                        Add Prerequisite
				                      </Button>
				                    </ListItem>
				                  </List>
			            )
						:
							<List className={classes.fullWidthList}>
							{console.log('dummy 936',item)}
							{/*
								item.prerequisite.map((subitem, subindex) => (
									<>{console.log('subitem.uri.uri',items.ddPipelineSteps)}
			                          <ListItem>
									<TextField InputProps={{ className: classes.root }} label={'Name'} fullWidth variant="outlined" value={cF(subitem.uri.filename)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'filename')} />{console.log('subitem',subitem)}
			                          </ListItem>
			                          <ListItem>
			                            <TextField InputProps={{ className: classes.root }} label={'Filename'} fullWidth variant="outlined" value={cF(subitem.filename)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'filename')} />
			                          </ListItem>
			                          <ListItem>
			                            <TextField InputProps={{ className: classes.root }} error={cF(subitem.uri.uri) === "" ? true : false} label={'URI'} fullWidth variant="outlined" value={cF(subitem.uri.uri)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'uri')} />
			                          </ListItem>
			                          <ListItem>
			                            <TextField InputProps={{ className: classes.root }} label={'Access Time'} fullWidth variant="outlined" value={cF(subitem.access_time)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'access_time')} />
			                          </ListItem>
			                          <ListItem>
			                            <TextField InputProps={{ className: classes.root }} label={'SHA1 Checksum'} fullWidth variant="outlined" value={cF(subitem.sha1_checksum)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'sha1_checksum')} />
			                          </ListItem>
			                          {
			                            subindex !== item.prerequisite.length-1
			                              ?
			                                <ListItem>
			                                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'prerequisite')}>
			                                    Remove
			                                  </Button>
			                                </ListItem>
			                              :
			                                <ListItem divider>
			                                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'prerequisite')}>
			                                    Remove
			                                  </Button>
			                                </ListItem>
			                          }
			                        </>
			                        )
			                      )
			                */}
		                    <ListItem>
		                      <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addListRows(index, 'prerequisite')}>
		                        Add Prerequisite again
		                      </Button>
		                    </ListItem>
							</List>
					}
				  </AccordionDetails>

                {/*<AccordionDetails>
                  <List className={classes.fullWidthList}>
                    {
					item.prerequisite.map((subitem, subindex) => (
						<>{console.log('subitem.uri.uri',items.ddPipelineSteps)}
                          <ListItem>
						<TextField InputProps={{ className: classes.root }} label={'Name'} fullWidth variant="outlined" value={cF(subitem.uri.filename)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'filename')} />{console.log('subitem',subitem)}
                          </ListItem>
                          <ListItem>
                            <TextField InputProps={{ className: classes.root }} label={'Filename'} fullWidth variant="outlined" value={cF(subitem.filename)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'filename')} />
                          </ListItem>
                          <ListItem>
                            <TextField InputProps={{ className: classes.root }} error={cF(subitem.uri.uri) === "" ? true : false} label={'URI'} fullWidth variant="outlined" value={cF(subitem.uri.uri)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'uri')} />
                          </ListItem>
                          <ListItem>
                            <TextField InputProps={{ className: classes.root }} label={'Access Time'} fullWidth variant="outlined" value={cF(subitem.access_time)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'access_time')} />
                          </ListItem>
                          <ListItem>
                            <TextField InputProps={{ className: classes.root }} label={'SHA1 Checksum'} fullWidth variant="outlined" value={cF(subitem.sha1_checksum)} onChange={(e) => setListInput(e, index, 'prerequisite', subindex, 'sha1_checksum')} />
                          </ListItem>
                          {
                            subindex !== item.prerequisite.length-1
                              ?
                                <ListItem>
                                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'prerequisite')}>
                                    Remove
                                  </Button>
                                </ListItem>
                              :
                                <ListItem divider>
                                  <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeListRows(index, subindex, 'prerequisite')}>
                                    Remove
                                  </Button>
                                </ListItem>
                          }
                        </>
                        )
                      )
                    }
                    <ListItem>
                      <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addListRows(index, 'prerequisite')}>
                        Add Prerequisite
                      </Button>
                    </ListItem>
                  </List>
                </AccordionDetails>*/}

					
                </Accordion>
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
                    <List className={classes.fullWidthList}>
                      {
                        item.input_list.map((subitem, subindex) => (
                          <>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} label={'Filename'} fullWidth variant="outlined" value={cF(subitem.filename)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'filename')} />
                            </ListItem>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} error={cF(subitem.uri) === "" ? true : false} label={'URI'} fullWidth variant="outlined" value={cF(subitem.uri)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'uri')} />
                            </ListItem>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} label={'Access Time'} fullWidth variant="outlined" value={cF(subitem.access_time)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'access_time')} />
                            </ListItem>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} label={'SHA1 Checksum'} fullWidth variant="outlined" value={cF(subitem.sha1_checksum)} onChange={(e) => setListInput(e, index, 'input_list', subindex, 'sha1_checksum')} />
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
                    <List className={classes.fullWidthList}>
                      {
                        item.output_list.map((subitem, subindex) => (
                          <>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} label={'Filename'} fullWidth variant="outlined" value={cF(subitem.filename)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'filename')} />
                            </ListItem>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} error={cF(subitem.uri) === "" ? true : false} label={'URI'} fullWidth variant="outlined" value={cF(subitem.uri)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'uri')} />
                            </ListItem>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} label={'Access Time'} fullWidth variant="outlined" value={cF(subitem.access_time)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'access_time')} />
                            </ListItem>
                            <ListItem>
                              <TextField InputProps={{ className: classes.root }} label={'SHA1 Checksum'} fullWidth variant="outlined" value={cF(subitem.sha1_checksum)} onChange={(e) => setListInput(e, index, 'output_list', subindex, 'sha1_checksum')} />
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
              <TableCell>
              </TableCell>
            </TableRow>
						</>
          )
        )
      }
      <TableRow>
        <StyledCell colSpan="5">
          <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('ddPipelineSteps')}>
            Add Step
          </Button>
        </StyledCell>
      </TableRow>
    </TableBody>
  </Table>
  );
}
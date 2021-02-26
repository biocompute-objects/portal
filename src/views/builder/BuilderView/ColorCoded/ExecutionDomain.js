import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Inputs
import TextField from '@material-ui/core/TextField';

// Add environment variable
import Button from '@material-ui/core/Button'

//import { TextInput } from 'react-native';

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
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function ExecutionDomain({ items, cF }) {
  
  const classes = useStyles();

  // State for showing missing sections.
  // TODO: For some reason didn't work with [items.executionDomain]

  // State for showing missing sections.
  const [missingExecutionDomain, setMissingExecutionDomain] = useState(true);
  const [missingScript, setMissingScript] = useState(false);
  const [missingScriptDriver, setMissingScriptDriver] = useState(false);

  const [missingSoftwarePrerequisites, setMissingSoftwarePrerequisites] = useState(false);
  const [missingSoftwarePrerequisitesName, setMissingSoftwarePrerequisitesName] = useState(false);
  const [missingSoftwarePrerequisitesVersion, setMissingSoftwarePrerequisitesVersion] = useState(false);
  const [missingSoftwarePrerequisitesUri, setMissingSoftwarePrerequisitesUri] = useState(false);

  const [missingExternalDataEndpoints, setMissingExternalDataEndpoints] = useState(false);
  const [missingExternalDataEndpointsName, setMissingExternalDataEndpointsName] = useState(false);
  const [missingExternalDataEndpointsUrl, setMissingExternalDataEndpointsUrl] = useState(false);

  const [missingEnvironmentVariables, setMissingEnvironmentVariables] = useState(false);
  const [missingEnvironmentVariablesKey, setMissingEnvironmentVariablesKey] = useState(false);
  const [missingEnvironmentVariablesValue, setMissingEnvironmentVariablesValue] = useState(false);

  useEffect(() => {
    
    // Create an OR flag.
    var orFlag = false;
    
    // Script
    if(items.edScript === "") {
      
      // No script.
      setMissingScript(true);
      
      // Set the OR flag.
      orFlag = true;

    } else {
      setMissingScript(false);
    }
    
    // Script driver
    if(items.edScriptDriver == "") {

      // No script driver.
      setMissingScriptDriver(true);

      // Set the OR flag.
      orFlag = true;

    } else {
      setMissingScriptDriver(false);
    }

    // Each field must be treated independently so that
    // our state is compared only to the relevant field.

    // Software prerequisites are required
    if(items.edSoftwarePrerequisites.length == 0) {
      
      // No software prerequisites.
      setMissingSoftwarePrerequisites(true);

      // No sub-fields.
      setMissingSoftwarePrerequisitesName(true);
      setMissingSoftwarePrerequisitesVersion(true);
      setMissingSoftwarePrerequisitesUri(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there are software prerequisites, we have to consider
      // the necessary subfields.

      // Assume the header is not red.
      setMissingSoftwarePrerequisites(false);

      // Each one of the software prerequisites.
      for(var i = 0; i < items.edSoftwarePrerequisites.length; i++) {

        // Name
        if(items.edSoftwarePrerequisites[i].name === "") {
          
          // No Name.
          setMissingSoftwarePrerequisitesName(true);

          // Header
          setMissingSoftwarePrerequisites(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingSoftwarePrerequisitesName(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }

      // Each one of the software prerequisites.
      for(var i = 0; i < items.edSoftwarePrerequisites.length; i++) {

        // Name
        if(items.edSoftwarePrerequisites[i].version === "") {
          
          // No Version.
          setMissingSoftwarePrerequisitesVersion(true);

          // Header
          setMissingSoftwarePrerequisites(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingSoftwarePrerequisitesVersion(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }

      // Each one of the software prerequisites.
      for(var i = 0; i < items.edSoftwarePrerequisites.length; i++) {

        // Name
        if(items.edSoftwarePrerequisites[i].uri.uri === "") {
          
          // No Name.
          setMissingSoftwarePrerequisitesUri(true);

          // Header
          setMissingSoftwarePrerequisites(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingSoftwarePrerequisitesName(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }
      
    }

    // External data endpoints are required
    if(items.edExternalDataEndpoints.length == 0) {
      
      // No external data endpoints.
      setMissingExternalDataEndpoints(true);

      // No sub-fields.
      setMissingExternalDataEndpointsName(true);
      setMissingExternalDataEndpointsUrl(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there are external data endpoints, we have to consider
      // the necessary subfields.

      // Assume the header is not red.
      setMissingExternalDataEndpoints(false);

      // Each one of the software prerequisites.
      for(var i = 0; i < items.edExternalDataEndpoints.length; i++) {

        // Name
        if(items.edExternalDataEndpoints[i].name === "") {
          
          // No Name.
          setMissingExternalDataEndpointsName(true);

          // Header
          setMissingExternalDataEndpoints(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingExternalDataEndpointsName(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }

      // Each one of the software prerequisites.
      for(var i = 0; i < items.edExternalDataEndpoints.length; i++) {

        // URL
        if(items.edExternalDataEndpoints[i].url === "") {
          
          // No URL.
          setMissingExternalDataEndpointsUrl(true);

          // Header
          setMissingExternalDataEndpoints(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingExternalDataEndpointsUrl(false);
        }

        // Can't rely on orFlag here because fields like
        // Name, Version, and License also depend on it.
        
      }
      
    }

    // Environment variables are required
    if(items.edEnvironmentVariables.length == 0) {
      
      // No environment variables.
      setMissingEnvironmentVariables(true);

      // No sub-fields.
      setMissingEnvironmentVariablesKey(true);
      setMissingEnvironmentVariablesValue(true);

      // Set the OR flag.
      orFlag = true;

    } else {

      // If there are environment variables, we have to consider
      // the necessary subfields.

      // Assume the header is not red.
      setMissingEnvironmentVariables(false);

      // Each one of the keys.
      for(var i = 0; i < items.edEnvironmentVariables.length; i++) {

        // Key
        if(items.edEnvironmentVariables[i].key === "") {
          
          // No Key.
          setMissingEnvironmentVariablesKey(true);

          // Header
          setMissingEnvironmentVariables(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingEnvironmentVariablesKey(false);
        }

        // Can't rely on orFlag here.
        
      }

      // Each one of the values.
      for(var i = 0; i < items.edEnvironmentVariables.length; i++) {

        // Key
        if(items.edEnvironmentVariables[i].value === "") {
          
          // No Key.
          setMissingEnvironmentVariablesValue(true);

          // Header
          setMissingEnvironmentVariables(true);

          // Set the OR flag.
          orFlag = true;

          break;

        } else {
          setMissingEnvironmentVariablesValue(false);
        }

        // Can't rely on orFlag here.
        
      }
      
    }

    // Was one OR the other missing?
    if(orFlag) {
      setMissingExecutionDomain(true);
    } else {

      // All required fields are ok.
      setMissingScript(false);
      setMissingScriptDriver(false);
      setMissingSoftwarePrerequisitesName(false);
      setMissingSoftwarePrerequisitesVersion(false);
      setMissingSoftwarePrerequisitesUri(false);
      setMissingExternalDataEndpointsName(false);
      setMissingExternalDataEndpointsUrl(false);
      setMissingEnvironmentVariablesKey(false);
      setMissingEnvironmentVariablesValue(false);

      setMissingSoftwarePrerequisites(false);
      setMissingExternalDataEndpoints(false);
      setMissingEnvironmentVariables(false);
      setMissingExecutionDomain(false);

    }

  }, [items]);

  // Arguments
  // ---------
  // items: JSON object (Execution Domain)


  // ----- Meta Information ----- //
  

  // ----- None ----- //

  return(
    <div>
    <Table size="small">
    <TableHead className={classes.tabled}>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography className={missingExecutionDomain ? classes.missingHeader : classes.header} variant="h1">
            Execution Domain
          </Typography>
        </StyledCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <StyledCell>
          <Typography className={missingScript ? classes.missingHeader: classes.header} variant="h3">
            Script
          </Typography>
        </StyledCell>
        <StyledCell colSpan="5">
          <TextField defaultValue={items.script} variant="outlined" />
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography className={missingScriptDriver ? classes.missingHeader: classes.header} variant="h3">
            Script Driver
          </Typography>
        </StyledCell>
        <StyledCell colSpan="5">
          <TextField variant="outlined"></TextField>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography variant="h3">
            Software Prerequisites
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        {
          ['Name', 'Version', 'Filename', 'URI', 'Access Time', 'SHA1 Checksum'].map(item => (
              <StyledCell>
                <Typography>
                  {item}
                </Typography>
              </StyledCell>
            )
          )
        }
      </TableRow>
      <TableRow>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
        <StyledCell><TextField variant="outlined"></TextField></StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Button variant="contained" color="primary" disableElevation fullWidth>
            Add Software Prerequisite
          </Button>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography variant="h3">
            External Data Endpoints
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
      <StyledCell>
        <Typography>
          Name
        </Typography>
      </StyledCell>
      <StyledCell colSpan="5">
        <Typography>
          URL
        </Typography>
      </StyledCell>
      </TableRow>
      <TableRow>
      <StyledCell>
        <TextField variant="outlined"></TextField>
      </StyledCell>
      <StyledCell colSpan="5">
        <TextField variant="outlined"></TextField>
      </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Button variant="contained" color="primary" disableElevation fullWidth>
            Add External Data Endpoint
          </Button>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Typography variant="h3">
            Environment Variables
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell>
          <Typography>
            Key
          </Typography>
        </StyledCell>
        <StyledCell>
          <Typography>
            Value
          </Typography>
        </StyledCell>
      </TableRow>
      <TableRow>
        <StyledCell colSpan="6">
          <Button variant="contained" color="primary" disableElevation fullWidth>
            Add Environment Variable
          </Button>
        </StyledCell>
      </TableRow>
    </TableBody>
  </Table>
  </div>
  );
}
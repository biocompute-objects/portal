import React, { useEffect, useState } from 'react';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';

// Datetime picker
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';

// Inputs
import TextField from '@material-ui/core/TextField';

// Add buttons
import Button from '@material-ui/core/Button';

import EnvVar from './EnvVar';

// Section cell styling
const useStyles = makeStyles((theme) => ({
  header: {
    color: 'black'
  },
  missingHeader: {
    color: 'red'
  },
  root: {
    color: 'black'
  }
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function ExecutionDomain({ items, cF }) {
  const classes = useStyles();

  // State for showing missing sections.
  const [missingExecutionDomain, setMissingExecutionDomain] = useState(true);
  const [missingScriptDriver, setMissingScriptDriver] = useState(false);
  const [missingSoftwarePrerequisites, setMissingSoftwarePrerequisites] = useState(false);
  const [missingSoftwarePrerequisitesName, setMissingSoftwarePrerequisitesName] = useState(false);
  const [missingSoftwarePrerequisitesVersion, setMissingSoftwarePrerequisitesVersion] = useState(false);
  const [missingSoftwarePrerequisitesUri, setMissingSoftwarePrerequisitesUri] = useState(false);
  const [missingExternalDataEndpoints, setMissingExternalDataEndpoints] = useState(false);
  const [missingExternalDataEndpointsName, setMissingExternalDataEndpointsName] = useState(false);
  const [missingExternalDataEndpointsUrl, setMissingExternalDataEndpointsUrl] = useState(false);
  const [missingScript, setMissingScript] = useState(false);
  const [missingScriptUri, setMissingScriptUri] = useState(false);

  useEffect(() => {
    // Create an OR flag.
    let orFlag = false;

    // Script driver
    if (items.edScriptDriver === '') {
      // No script driver.
      setMissingScriptDriver(true);

      // Set the OR flag.
      orFlag = true;
    } else {
      setMissingScriptDriver(false);
    }

    // Software prerequisites
    if (items.edSoftwarePrerequisites.length === 0) {
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

      // Each field must be treated independently so that
      // our state is compared only to the relevant field.

      // Assume the header is not red.
      setMissingSoftwarePrerequisites(false);

      // Each one of the prerequisites name.
      for (let prereqName = 0; prereqName < items.edSoftwarePrerequisites.length; prereqName++) {
        // Name
        if (items.edSoftwarePrerequisites[prereqName].name === '') {
          // No name.
          setMissingSoftwarePrerequisitesName(true);

          // Header
          setMissingSoftwarePrerequisites(true);

          // Set the OR flag.
          orFlag = true;

          break;
        } else {
          setMissingSoftwarePrerequisites(false);
        }
      }

      // Each one of the prerequisites version.
      for (let prereqVersion = 0; prereqVersion < items.edSoftwarePrerequisites.length; prereqVersion++) {
        // Version
        if (items.edSoftwarePrerequisites[prereqVersion].version === '') {
          // No version.
          setMissingSoftwarePrerequisitesVersion(true);

          // Header
          setMissingSoftwarePrerequisites(true);

          // Set the OR flag.
          orFlag = true;

          break;
        } else {
          setMissingSoftwarePrerequisites(false);
        }
      }

      // Each one of the prerequisites URI.
      for (let prereqURI = 0; prereqURI < items.edSoftwarePrerequisites.length; prereqURI++) {
        // URI
        if (items.edSoftwarePrerequisites[prereqURI].uri.uri === '') {
          // No URI.
          setMissingSoftwarePrerequisitesUri(true);

          // Header
          setMissingSoftwarePrerequisites(true);

          // Set the OR flag.
          orFlag = true;

          break;
        } else {
          setMissingSoftwarePrerequisites(false);
        }
      }
    }

    // External data endpoints
    if (items.edExternalDataEndpoints.length === 0) {
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

      // Each field must be treated independently so that
      // our state is compared only to the relevant field.

      // Assume the header is not red.
      setMissingExternalDataEndpoints(false);

      // Each one of the endpoints.
      for (let i = 0; i < items.edExternalDataEndpoints.length; i++) {
        // Name
        if (items.edExternalDataEndpoints[i].name === '') {
          // No name.
          setMissingExternalDataEndpointsName(true);

          // Header
          setMissingExternalDataEndpoints(true);

          // Set the OR flag.
          orFlag = true;

          break;
        } else {
          setMissingExternalDataEndpoints(false);
        }
      }

      // Each one of the endpoints.
      for (let edURL = 0; edURL < items.edExternalDataEndpoints.length; edURL++) {
        // Name
        if (items.edExternalDataEndpoints[edURL].url === '') {
          // No URL.
          setMissingExternalDataEndpointsUrl(true);

          // Header
          setMissingExternalDataEndpoints(true);

          // Set the OR flag.
          orFlag = true;

          break;
        } else {
          setMissingExternalDataEndpoints(false);
        }
      }
    }

    // Script
    if (items.edScript.length === 0) {
      // No script.
      setMissingScript(true);

      // No sub-fields.
      setMissingScriptDriver(true);
      setMissingScriptUri(true);

      // Set the OR flag.
      orFlag = true;
    } else {
      // If there is a script, we have to consider
      // the necessary subfields.

      // Each field must be treated independently so that
      // our state is compared only to the relevant field.

      // Assume the header is not red.
      setMissingScript(false);

      // Each one of the scripts.
      for (let edScript = 0; edScript < items.edScript.length; edScript++) {
        // Name
        if (items.edScript[edScript].uri.uri === '') {
          // No URI.
          setMissingScriptUri(true);

          // Header
          setMissingScript(true);

          // Set the OR flag.
          orFlag = true;

          break;
        } else {
          setMissingScript(false);
        }
      }
    }

    // Was one OR the other missing in the pipeline input/output?
    if (orFlag) {
      setMissingExecutionDomain(true);
    } else {
      // All required fields are ok.
      setMissingSoftwarePrerequisitesName(false);
      setMissingSoftwarePrerequisitesVersion(false);
      setMissingSoftwarePrerequisitesUri(false);
      setMissingExternalDataEndpointsName(false);
      setMissingExternalDataEndpointsUrl(false);

      setMissingSoftwarePrerequisites(false);
      setMissingExternalDataEndpoints(false);
      setMissingScript(false);

      setMissingExecutionDomain(false);
    }
  }, [items]);

  // TODO: I think it is the above that is making it so that all of these checks
  //       run over and over again when any field is changed.  This is probably through
  //       all of these component files.

  // Set an input value

  // There were problems with value/defaultValue,
  // so I opted to put in a custom handler based
  // on the response at https://github.com/facebook/react/issues/8053#issuecomment-255555133

  // See also https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value
  const setInput = (event, i, inputName, which) => {
     // Get the state variable.
    const dummy = items[which];

    // TODO: Put in date-time logic...

    // Cases
    if (which === 'edSoftwarePrerequisites') {
      // Special rule for URI.
      if (inputName === 'uri' || inputName === 'filename' || inputName === 'access_time' || inputName === 'sha1_checksum') {
        dummy[i].uri[inputName] = event.target.value;
      } else {
        dummy[i][inputName] = event.target.value;
      }

      // Update the state.
      items.setEdSoftwarePrerequisites(dummy);
    } else if (which === 'edExternalDataEndpoints') {
      // Change the value at the given index.
      dummy[i][inputName] = event.target.value;

      // Update the state.
      items.setEdExternalDataEndpoints(dummy);
    } else if (which === 'edScript') {
      // Only possible to set on the URI key.
      dummy[i].uri[inputName] = event.target.value;

      // Update the state.
      items.setEdScript(dummy);
    }

    // Needed to re-render the page.
    items.setRerender(items.rerender + 1);
  };

  const setDateTimeInput = (date_time, i, inputName, which) => {
      // Get the state variable.
      const dummy = items[which];

     // Cases
     if (which === 'edSoftwarePrerequisites') {
      // Special rule for URI.
        dummy[i].uri[inputName] = date_time;
      // Update the state.
      items.setEdSoftwarePrerequisites(dummy);
    } else if (which === 'edExternalDataEndpoints') {
      // Change the value at the given index.
      dummy[i][inputName] = date_time;//event.target.value;

      // Update the state.
      items.setEdExternalDataEndpoints(dummy);
    } else if (which === 'edScript') {
      // Only possible to set on the URI key.
      dummy[i].uri[inputName] = date_time;//event.target.value;

      // Update the state.
      items.setEdScript(dummy);
    }
     // Needed to re-render the page.
     items.setRerender(items.rerender + 1);
  };


  // Add a row
  const addRows = (which) => {
    // Get the state variable.
    const dummy = items[which];

    // Cases
    if (which === 'edSoftwarePrerequisites') {
      // Push the new row.
      dummy.push({
        name: '',
        version: '',
        uri: {
          uri: ''
        }
      });

      // Update the state.
      items.setEdSoftwarePrerequisites(dummy);
    } else if (which === 'edExternalDataEndpoints') {
      // Push the new row.
      dummy.push({
        name: '',
        url: ''
      });

      // Update the state.
      items.setEdExternalDataEndpoints(dummy);
    } else if (which === 'edScript') {
      // Push the new row.
      dummy.push({
        uri: {
          uri: ''
        }
      });

      // Update the state.
      items.setEdScript(dummy);
    }

    // Needed to re-render the page.
    items.setRerender(items.rerender + 1);
  };

  // Remove a row
  const removeRows = (which, i) => {
    // Get the state variable.
    const dummy = items[which];

    // Remove the index.
    dummy.splice(i, 1);

    // Cases
    if (which === 'edSoftwarePrerequisites') {
      // Update the state.
      items.setEdSoftwarePrerequisites(dummy);
    } else if (which === 'edExternalDataEndpoints') {
      // Update the state.
      items.setEdExternalDataEndpoints(dummy);
    } else if (which === 'edScript') {
      // Update the state.
      items.setEdScript(dummy);
    }

    // Needed to re-render the page.
    items.setRerender(items.rerender + 1);
  };

  // Arguments
  // ---------
  // items: JSON object (Execution Domain)

  // ----- Meta Information ----- //

  // ----- None ----- //

  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="12">
            <Button
              variant="contained"
              // color="D5D8DC"
              fullWidth
              onClick={() => window.open('https://docs.biocomputeobject.org/execution-domain/')}
            >
              <Typography className={missingExecutionDomain ? classes.missingHeader : classes.header} variant="h1">
                Execution Domain &nbsp;
                <HelpIcon />
              </Typography>
            </Button>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
          <StyledCell colSpan="7">
            <Typography className={missingScript ? classes.missingHeader : classes.header} variant="h3">
              Script
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="2">
            <Typography>
              Filename
            </Typography>
          </StyledCell>
          <StyledCell colSpan="2">
            <Typography className={missingScriptUri ? classes.missingHeader : classes.header}>
              URI
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography>
              Access Time
            </Typography>
          </StyledCell>
          <StyledCell colSpan="2">
            <Typography>
              SHA1 Checksum
            </Typography>
          </StyledCell>
        </TableRow>
        {
        items.edScript.map((item, index) => (
          <TableRow key={index.toString()}>
            <StyledCell colSpan="2">
              <TextField InputProps={{ className: classes.root }} fullWidth value={cF(item.uri.filename)} variant="outlined" onChange={(e) => setInput(e, index, 'filename', 'edScript')} />
            </StyledCell>
            <StyledCell colSpan="2">
              <TextField InputProps={{ className: classes.root }} error={cF(item.uri.uri) === ''} fullWidth value={cF(item.uri.uri)} variant="outlined" onChange={(e) => setInput(e, index, 'uri', 'edScript')} />
            </StyledCell>
            <StyledCell>
              <Datetime inputProps={{ className: classes.root }} id="outlined-basic" value={cF(item.uri.access_time)} onChange={(date) => setDateTimeInput(date, index, 'access_time', 'edScript')} dateFormat='YYYY-MM-DD' timeFormat={true}/>
            </StyledCell>
            <StyledCell>
              <TextField InputProps={{ className: classes.root }} value={cF(item.uri.sha1_checksum)} variant="outlined" onChange={(e) => setInput(e, index, 'sha1_checksum', 'edScript')} fullWidth />
            </StyledCell>
            <StyledCell>
              <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('edScript', index)}>
                Remove
              </Button>
            </StyledCell>
          </TableRow>
        ))
      }
        <TableRow>
          <StyledCell colSpan="6">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('edScript')}>
              Add Script
            </Button>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            <Typography className={missingScriptDriver ? classes.missingHeader : classes.header}>
              Script Driver
            </Typography>
          </StyledCell>
          <StyledCell colSpan="6">
            <TextField InputProps={{ className: classes.root }} error={!!missingScriptDriver} fullWidth id="outlined-basic" value={cF(items.edScriptDriver)} onChange={(e) => items.setEdScriptDriver(e.target.value)} variant="outlined" />
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="7">
            <Typography className={missingSoftwarePrerequisites ? classes.missingHeader : classes.header} variant="h3">
              Software Prerequisites
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell>
            <Typography className={missingSoftwarePrerequisitesName ? classes.missingHeader : classes.header}>
              Name
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography className={missingSoftwarePrerequisitesVersion ? classes.missingHeader : classes.header}>
              Version
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography>
              Filename
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography className={missingSoftwarePrerequisitesUri ? classes.missingHeader : classes.header}>
              URI
            </Typography>
          </StyledCell>
          <StyledCell>
            <Typography>
              Access Time
            </Typography>
          </StyledCell>
          <StyledCell colSpan="2">
            <Typography>
              SHA1 Checksum
            </Typography>
          </StyledCell>
        </TableRow>
        {
        items.edSoftwarePrerequisites.map((item, index) => (
          <TableRow key={index.toString()}>
            <StyledCell>
              <TextField InputProps={{ className: classes.root }} value={cF(item.name)} variant="outlined" onChange={(e) => setInput(e, index, 'name', 'edSoftwarePrerequisites')} />
            </StyledCell>
            <StyledCell>
              <TextField InputProps={{ className: classes.root }} value={cF(item.version)} variant="outlined" onChange={(e) => setInput(e, index, 'version', 'edSoftwarePrerequisites')} />
            </StyledCell>
            <StyledCell>
              <TextField InputProps={{ className: classes.root }} value={cF(item.uri.filename)} variant="outlined" onChange={(e) => setInput(e, index, 'filename', 'edSoftwarePrerequisites')} />
            </StyledCell>
            <StyledCell>
              <TextField InputProps={{ className: classes.root }} error={cF(item.uri.uri) === ''} value={cF(item.uri.uri)} variant="outlined" onChange={(e) => setInput(e, index, 'uri', 'edSoftwarePrerequisites')} />
            </StyledCell>
            <StyledCell>
              <Datetime inputProps={{ className: classes.root }} id="outlined-basic" value={cF(item.uri.access_time)} onChange={(date) => setDateTimeInput(date, index, 'access_time', 'edSoftwarePrerequisites')} dateFormat='YYYY-MM-DD' timeFormat={true}/>
            </StyledCell>
            <StyledCell>
              <TextField InputProps={{ className: classes.root }} value={cF(item.uri.sha1_checksum)} variant="outlined" onChange={(e) => setInput(e, index, 'sha1_checksum', 'edSoftwarePrerequisites')} fullWidth />
            </StyledCell>
            <StyledCell>
              <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('edSoftwarePrerequisites', index)}>
                Remove
              </Button>
            </StyledCell>
          </TableRow>
        ))
      }
        <TableRow>
          <StyledCell colSpan="6">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('edSoftwarePrerequisites')}>
              Add Software Prerequisite
            </Button>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="7">
            <Typography className={missingExternalDataEndpoints ? classes.missingHeader : classes.header} variant="h3">
              External Data Endpoints
            </Typography>
          </StyledCell>
        </TableRow>
        <TableRow>
          <StyledCell colSpan="3">
            <Typography className={missingExternalDataEndpointsName ? classes.missingHeader : classes.header}>
              Name
            </Typography>
          </StyledCell>
          <StyledCell colSpan="4">
            <Typography className={missingExternalDataEndpointsUrl ? classes.missingHeader : classes.header}>
              URL
            </Typography>
          </StyledCell>
        </TableRow>
        {
        items.edExternalDataEndpoints.map((item, index) => (
          <TableRow key={index.toString()}>
            <StyledCell colSpan="3">
              <TextField InputProps={{ className: classes.root }} error={cF(item.name) === ''} fullWidth value={cF(item.name)} variant="outlined" onChange={(e) => setInput(e, index, 'name', 'edExternalDataEndpoints')} />
            </StyledCell>
            <StyledCell colSpan="3">
              <TextField InputProps={{ className: classes.root }} error={cF(item.url) === ''} fullWidth value={cF(item.url)} variant="outlined" onChange={(e) => setInput(e, index, 'url', 'edExternalDataEndpoints')} />
            </StyledCell>
            <StyledCell>
              <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => removeRows('edExternalDataEndpoints', index)}>
                Remove
              </Button>
            </StyledCell>
          </TableRow>
        ))
      }
        <TableRow>
          <StyledCell colSpan="6">
            <Button variant="contained" color="primary" disableElevation fullWidth onClick={() => addRows('edExternalDataEndpoints')}>
              Add External Data Endpoint
            </Button>
          </StyledCell>
        </TableRow>
      </TableBody>
      <EnvVar
        link="link to some stuff"
        header="Environment Variables"
        object={items.edEnvironmentVariables}
        setObject={items.setEdEnvironmentVariables}
        setRerender={items.setRerender}
        rerender={items.rerender}
        fields={['key', 'value']}
      />
    </Table>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

// Display options
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Styling
// Source: https://stackoverflow.com/questions/43975839/material-ui-next-styling-text-inside-listitemtext

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  emphasized: {
    fontWeight: 'bold',
    fontSize: '21px'
  },
  navHeader: {
    textAlign: 'center'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

// Options
// Source: https://material-ui.com/components/checkboxes/#checkbox

export default function ObjectOptions() {

  const classes = useStyles();

  const [state, setState] = React.useState({
    fieldHover: true,
    descriptionDomain: true,
    errorDomain: true,
    executionDomain: true,
    ioDomain: true,
    objectDomain: true,
    parametricDomain: true,
    provenanceDomain: true,
    usabilityDomain: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { fieldHover, descriptionDomain, errorDomain, executionDomain, ioDomain, objectDomain, parametricDomain, provenanceDomain, usabilityDomain } = state;

  return (
    <div className={classes.root}>
      <List className={classes.navHeader}>
          <ListItemText classes={{ primary: classes.emphasized }} primary="Object Options" />
        <ListItemLink href="https://www.github.com/" target="_blank">
          <ListItemText primary="eMail object" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Show derived from chain" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Download Object" />
        </ListItemLink>
        <ListItemText classes={{ primary: classes.emphasized }} primary="Display Options" />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={fieldHover} onChange={handleChange} name="fieldHover" />}
              label="Describe fields on hover"
            />
            <FormControlLabel
              control={<Checkbox checked={objectDomain} onChange={handleChange} name="objectDomain" />}
              label="Object Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={provenanceDomain} onChange={handleChange} name="provenanceDomain" />}
              label="Provenance Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={descriptionDomain} onChange={handleChange} name="descriptionDomain" />}
              label="Description Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={executionDomain} onChange={handleChange} name="executionDomain" />}
              label="Execution Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={ioDomain} onChange={handleChange} name="ioDomain" />}
              label="IO Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={usabilityDomain} onChange={handleChange} name="usabilityDomain" />}
              label="Usability Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={parametricDomain} onChange={handleChange} name="parametricDomain" />}
              label="Parametric Domain"
            />
          </FormGroup>
        </FormControl>

      </List>
    </div>
  );
}

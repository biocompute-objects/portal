import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Display options
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EmailIcon from '@material-ui/icons/Email';
import GetAppIcon from '@material-ui/icons/GetApp';
import LinkIcon from '@material-ui/icons/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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

  // Domain displays.  
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

  // Default display options.
  const [value, setValue] = React.useState('female');

  const defaultView = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <List className={classes.navHeader}>
        <ListItemText classes={{ primary: classes.emphasized }} primary="Object Options" />
        <ListItem button>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="eMail Object" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="Derivation Chain" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Download Object" />
        </ListItem>
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
            <FormControlLabel
              control={<Checkbox name="inlineBrowser" />}
              label="Inline Browser (show all objects)"
            />
          </FormGroup>
        </FormControl>
        <ListItemText classes={{ primary: classes.emphasized }} primary="Default Object View" />
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={defaultView}>
            <FormControlLabel value="female" control={<Radio />} label="Color-Coded" />
            <FormControlLabel value="male" control={<Radio />} label="Tree" />
            <FormControlLabel value="other" control={<Radio />} label="Raw" />
          </RadioGroup>
        </FormControl>
      </List>
    </div>
  );
}

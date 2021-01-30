import React, { useContext } from 'react';
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

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
import { DisplayContext } from '../../ObjectViewLayout/index';

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
  
  // Use the parent context.
  // Source: https://www.digitalocean.com/community/tutorials/react-usecontext

  // As of 1/29/21, there is a problem in React with this function call.
  // Source: https://stackoverflow.com/questions/62564671/using-usecontext-in-react-doesnt-give-me-the-expect-data

  // Pull the state and change handler from the context.
  const { state, handleChange } = useContext(DisplayContext);

  const classes = useStyles();

  // Default display options.
  const [value, setValue] = React.useState('colorCoded');

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
              control={<Checkbox checked={false} onChange={handleChange} name="fieldHover" />}
              label="Describe fields on hover"
            />
            <FormControlLabel
              control={<Checkbox checked={state.objectDomain} onChange={handleChange} name="objectDomain" />}
              label="Object Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={state.provenanceDomain} onChange={handleChange} name="provenanceDomain" />}
              label="Provenance Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={state.descriptionDomain} onChange={handleChange} name="descriptionDomain" />}
              label="Description Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={state.executionDomain} onChange={handleChange} name="executionDomain" />}
              label="Execution Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={state.ioDomain} onChange={handleChange} name="ioDomain" />}
              label="IO Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={state.usabilityDomain} onChange={handleChange} name="usabilityDomain" />}
              label="Usability Domain"
            />
            <FormControlLabel
              control={<Checkbox checked={state.parametricDomain} onChange={handleChange} name="parametricDomain" />}
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
          <RadioGroup aria-label="gender" name="viewType" value={value} onChange={defaultView}>
            <FormControlLabel value="colorCoded" control={<Radio />} label="Color-Coded" />
            <FormControlLabel value="tree" control={<Radio />} label="Tree" />
            <FormControlLabel value="raw" control={<Radio />} label="Raw" />
          </RadioGroup>
        </FormControl>
      </List>
    </div>
  );
}

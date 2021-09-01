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

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
import { DisplayContext } from '../index';

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
  const {
    state, handleChange,
    view, defaultView
  } = useContext(DisplayContext);

  // Strings are required to make the radio select work,
  // we'll typecast to integer to render on the page.

  const classes = useStyles();

  // Split the string into two parts.
  // Source: https://stackoverflow.com/questions/20474257/split-string-into-two-parts*/}

  // TODO: abstract camelCase to split Capital Case later...

  return (
    <div className={classes.root}>
      <List className={classes.navHeader}>
        {/*
        <ListItemText classes={{ primary: classes.emphasized }} primary="Object Options" />
          <ListItem button onPress={() => alert('logging...')}>
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
	  */}
        <ListItemText classes={{ primary: classes.emphasized }} primary="Display Options" />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            {/* <FormControlLabel
              control={<Checkbox checked={false} onChange={handleChange} name="fieldHover" />}
              label="Describe fields on hover"
            /> */}
            {
              ['meta', 'provenanceDomain', 'descriptionDomain', 'executionDomain', 'ioDomain', 'usabilityDomain', 'parametricDomain', 'errorDomain', 'extensionDomain'].map((domain) => (
                <FormControlLabel
                  control={<Checkbox checked={state[domain]} onChange={handleChange} name={domain} />}
                  label={
                      domain == 'meta'
                        ? 'Meta'
                        : [
                          domain.substr(0, domain.indexOf('D')).charAt(0).toUpperCase() + domain.substr(0, domain.indexOf('D')).slice(1),
                          domain.substr(domain.indexOf('D'))
                        ].join(' ')
                    }
                />
              ))
            }
            {/* <FormControlLabel
              control={<Checkbox name="inlineBrowser" />}
              label="Inline Browser (show all objects)"
            /> */}
          </FormGroup>
        </FormControl>
        {/* <ListItemText classes={{ primary: classes.emphasized }} primary="Default Object View" />
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup aria-label="gender" name="viewType" value={view} onClick={defaultView}>
            <FormControlLabel value="0" control={<Radio />} label="Color-Coded" />
            <FormControlLabel value="1" control={<Radio />} label="Tree" />
            <FormControlLabel value="2" control={<Radio />} label="Raw" />
          </RadioGroup>
        </FormControl> */}
      </List>
    </div>
  );
}

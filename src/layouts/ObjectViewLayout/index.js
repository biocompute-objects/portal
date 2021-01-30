import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import BottomBar from './BottomBar'
import NavBar from './NavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 300
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

// Context
// Source: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

// Create the context, with defaults.
export const DisplayContext = React.createContext({
  state: {
    objectDomain: true, 
    provenanceDomain: true,
    descriptionDomain: true,
    executionDomain: true,
    ioDomain: true,
    usabilityDomain: true,
    parametricDomain: true
  },
  setState: () => {},
  handleChange: () => {}
});

const ObjectViewLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  // Domain displays.  
  const [state, setState] = React.useState({
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

  // Shared state to show the e-Mail dialog box.

  // We can't use simple props passing as of React version 16.13.1,
  // see https://github.com/ReactTraining/react-router/issues/7495

  // Instead, we have to use context.
  // Source (example): https://reactjs.org/docs/context.html
  
  // Note that the example as of 1/26/21 uses documentation for
  // React version 17.0.1.

  return (
    <DisplayContext.Provider value={{ state, handleChange }}>
      <div className={classes.root}>
        <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
                <Outlet />
            </div>
          </div>
        </div>
        <BottomBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      </div>
    </DisplayContext.Provider>
  );
};

export default ObjectViewLayout;

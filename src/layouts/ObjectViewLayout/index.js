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

// Define which domains we'll display.
const domains = {
  objectDomain: true, 
  provenanceDomain: true,
  descriptionDomain: true,
  executionDomain: true,
  ioDomain: true,
  usabilityDomain: true,
  parametricDomain: true
}

// Create the context.
export const DisplayContext = React.createContext();

const ObjectViewLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  // Shared state to show the e-Mail dialog box.

  // We can't use simple props passing as of React version 16.13.1,
  // see https://github.com/ReactTraining/react-router/issues/7495

  // Instead, we have to use context.
  // Source (example): https://reactjs.org/docs/context.html
  
  // Note that the example as of 1/26/21 uses documentation for
  // React version 17.0.1.

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar  
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <DisplayContext.Provider value={{ domains }}>
              <Outlet />
            </DisplayContext.Provider>
          </div>
        </div>
      </div>
      <BottomBar onMobileNavOpen={() => setMobileNavOpen(true)} />
    </div>
  );
};

export default ObjectViewLayout;

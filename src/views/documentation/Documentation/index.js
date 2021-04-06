// src/views/documentation/Documantation/index.js

import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Box,
	Container,
	Grid,
	makeStyles,
	Typography
} from '@material-ui/core';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactMarkdown from "react-markdown"; 
import Page from 'src/components/Page';

import InfoIcon from '@material-ui/icons/Info';

import About from "./About.js"
import UserGuide from "./UserGuide.js"
import BestPractices from "./BestPractices.js"
import StandardOperatingProceedures from "./StandardOperatingProceedures.js"
import Tutorials from "./Tutorials.js"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '100px',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  marginTopped: {
    marginTop: '50px'
  },
  whiteBackground: {
    backgroundColor: '#ffffff'
  }
}));

function DocView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Documentation">
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={12}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Tabs>
              <AppBar elivation={0} position="static">
                <TabList>
                  <Tab >About</Tab>
                  <Tab>User Guide</Tab>
                  <Tab>Best Practices</Tab>
                  <Tab>Standard Operating Proceedures</Tab>
                  <Tab>Tutorials</Tab>
                </TabList>
              </AppBar>
                <TabPanel>
                  <About />
                </TabPanel>
                <TabPanel>
                  <UserGuide />
                </TabPanel>
                <TabPanel>
                  <BestPractices />
                </TabPanel>
                <TabPanel>
                  <StandardOperatingProceedures />
                </TabPanel>
                <TabPanel>
                  <Tutorials />
                </TabPanel>
              </Tabs>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DocView;

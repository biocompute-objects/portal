// src/views/documentation/Documantation/about.js

import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe'
import {
	AppBar,
	Box,
	Container,
	Grid,
	makeStyles,
	Typography
} from '@material-ui/core';
import ReactMarkdown from "react-markdown"; 

import OpacityIcon from '@material-ui/icons/Opacity';

import about from "./MarkDowns/about.md"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '100px',
    minHeight: '100%',
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

function About() {
  const classes = useStyles();

 
  return (
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={12}>
          <Grid item xs={12} sm={12} lg={8} xl={8}>
            <iframe src="https://docs.biocomputeobject.org/best_practices/" 
              width="100%"
              height="800px"
              allow="fullscreen"
              className=""
              display="initial"
              position="relative"/>
            <br/><br/><br/>
          </Grid>
        </Grid>
      </Container>
  );
};

export default About;

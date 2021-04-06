// src/views/documentation/Documantation/SoP.js

import React, { useState, useEffect } from 'react';
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

import sop from "./MarkDowns/BCO_SOP.md"


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

function SoP() {
  const classes = useStyles();

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(SoP)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  
  return (
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={12}>
          <Grid item lg={8} sm={8} xl={8} xs={8}>
            <Typography><ReactMarkdown source={markdown} allowDangerousHtml={true} /> </ Typography>
	  		<br/><br/><br/>
          </Grid>
        </Grid>
      </Container>
  );
};

export default SoP;

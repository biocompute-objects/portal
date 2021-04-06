// src/views/community/Community/index.js

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ReactMarkdown from "react-markdown"; 
import Typography from '@material-ui/core/Typography';

import file from "./community.md"


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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

function Community() {
  const classes = useStyles();

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container justify='center' spacing={12}>
          <Grid item lg={8} sm={8} xl={8} xs={8}>
            <Typography><ReactMarkdown source={markdown} allowDangerousHtml={true} /> </ Typography>
	  		<br/><br/><br/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Community;

// src/views/prefix/index.js

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
import PrefixSearch from 'src/views/prefix/PrefixSearch';
import PrefixResults from 'src/views/prefix/PrefixResults';
import Page from 'src/components/Page';

export default function Prefix() {
  const [rows, setRows] = useState([]);
  return (
    <Page
    //   className={classes.root}
      title="BCO Prefix Registry"
    >
      <Container maxWidth={false}>
        <Typography variant="h3">
          BioCompute Object Prefix Registry
        </Typography>
        <Box>
          <PrefixSearch
            setRows={setRows}
          />
        </Box>
        <br />
        <Box>
          <PrefixResults
            rows={rows}
          />
        </Box>
      </Container>
    </Page>
  );
}

// Prefix.propTypes = {};

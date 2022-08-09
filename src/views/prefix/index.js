// src/views/prefix/index.js

import React, { useState, useContext } from 'react';
import { FetchContext } from 'src/App';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core';
import PrefixSearch from 'src/views/prefix/PrefixSearch';
import PrefixResults from 'src/views/prefix/PrefixResults';
import Page from 'src/components/Page';
import RegisterPrefix from 'src/components/API/UserdbRegisterPrefix';

export default function Prefix() {
  const [rows, setRows] = useState([]);
  const [addPrefix, setAddPrefix] = useState();
  const [modifyPrefix, setModifyPrefix] = useState(false);
  const [prefix, setPrefix] = useState();
  const fc = useContext(FetchContext);
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => {
    setAddPrefix();
    console.log(addPrefix);
  };

  const setInput = (event, which) => {
    if (which === 'prefix') {
      setPrefix(event.target.value);
    }
  };

  const submit = () => {
    RegisterPrefix(userInfo.username, prefix, fc.sending.userdb);
  };

  console.log('addPrefix', addPrefix, fc.isLoggedIn, fc.sending.userdb);

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
            addPrefix={addPrefix}
            setAddPrefix={setAddPrefix}
            fc={fc}
          />
        </Box>
        <br />
        <Box>
          <PrefixResults
            rows={rows}
            userInfo={userInfo}
          />
        </Box>
      </Container>
      <Dialog open={(addPrefix === true)}>
        <DialogTitle id="register-prefix">
          <Typography variant="h2">
            Register a new BCO Prefix
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            some text here
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="prefix"
            label="BCODB Prefix"
            fullWidth
            onChange={(event) => setInput(event, 'prefix')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}

// Prefix.propTypes = {};

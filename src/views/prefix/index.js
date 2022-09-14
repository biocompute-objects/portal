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
import 'react-datetime/css/react-datetime.css';

export default function Prefix() {
  const [rows, setRows] = useState([]);
  const [addPrefix, setAddPrefix] = useState();
  const [prefix, setPrefix] = useState('');
  const [description, setDescription] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const fc = useContext(FetchContext);
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => {
    setAddPrefix();
    setDescription();
    setPrefix('');
    console.log(addPrefix);
  };

  const setInput = (event, which) => {
    if (which === 'prefix') {
      setPrefix(event.target.value);
    }
    if (which === 'description') {
      setDescription(event.target.value);
    }
    if (which === 'public') {
      setIsPublic(event.target.value);
      console.log('public', isPublic);
    }
  };

  const submitPrefix = () => {
    RegisterPrefix(userInfo.username, prefix, fc.sending.userdb, isPublic, description);
    setAddPrefix();
  };

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
          <Typography />
          <TextField
            autoFocus
            margin="dense"
            id="prefix"
            label="BCODB Prefix"
            fullWidth
            onChange={(event) => setInput(event, 'prefix')}
          />
          <Typography>
            <input
              type="radio"
              data-limit="only-one-in-a-group"
              name="radio"
              value="true"
              onChange={(event) => setInput(event, 'public')}
            />
            &nbsp;&nbsp;Public Prefix&nbsp;&nbsp;
            <input
              type="radio"
              data-limit="only-one-in-a-group"
              name="radio"
              value="false"
              onChange={(event) => setInput(event, 'public')}
            />
            &nbsp;&nbsp;Private Prefix&nbsp;&nbsp;
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Prefix description"
            fullWidth
            onChange={(event) => setInput(event, 'description')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submitPrefix}
            color="primary"
            disabled={prefix.length < 3 || prefix.length > 5 || !isPublic}
          >
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

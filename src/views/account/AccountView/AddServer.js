import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Typography,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
// Host status
import ServerStatus from './ServerStatus';

// Summary information about the server
import ServerSummary from './ServerSummary';

// Fetch context.
import { FetchContext } from '../../../App';

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center'
  }
}));

export default function AddServer({ showing, setShowing }) {
  // Fetch context.
  const fc = useContext(FetchContext);
  const classes = useStyles();

  // Use the parent context.
  // Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
  const [serverAdded, setServerAdded] = useState(false);

  // State variables to hold the server information.
  const [hostname, setHostname] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [serverInfo, setServerInfo] = useState({});

  // TODO: improve error checking.
  const handleClose = () => {
    setShowing(false); // Clean out any server info that might have been fetched
    setServerInfo('');
    setHostname(''); // Clean the Public Hostname, Token, and e-Mail
    setEmail('');
    setToken('');
    setRequestStatus(''); // TODO: move later to be more "graceful" on close...
    // props.newServer('asdfas');
  };

  const checkApi = () => { // Check if the server and the given key are valid.
    let serverAdded = false; // See if this server has already been added.
    JSON.parse(localStorage.getItem('user')).apiinfo.map((record) => { // TODO: a bit expensive, use a for loop/break paradigm instead.
      if (record.public_hostname === hostname) { // Already added?
        serverAdded = true;
      }
    });
    if (serverAdded === false) { // Was the hostname already added?
      fetch(`${hostname}/api/accounts/describe/`, {
        method: 'POST',
        headers: {
          Authorization: `TOKEN ${token}`,
          'Content-type': 'application/json; charset=UTF-8'
        } // Instead of using status directly, we'll check for a necessary key
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json()
            .then((data) => {
              if (data.public_hostname !== 'undefined') {
                setRequestStatus('information_fetched');
                setServerInfo(data);
              } else {
                setRequestStatus('failure_to_connect');
              }
            });
        }
      })
        .catch((error) => {
          setRequestStatus('failure_to_connect');
          alert(`POST_api_objects_drafts_modify: FAILED! ${error}`);
        });
    } else {
      setRequestStatus('already_added'); // Indicate the error.
    }
  };

  // Add the server info to UserDB.
  const addServerInfoToUserDb = () => {
    console.log('Token: ', localStorage.getItem('token'));
    // Pull the server info straight off the state variable,
    // then add to UserDB.
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    updatedUser.apiinfo.push(serverInfo);
    // Add the server information to the user's information via userdb call.
    // TODO: This should probably be serverInfo below instead of the updatedUser directly
    //      accessed.  Just easier to read.
    fetch(fc.sending.userdb_addapi, {
      method: 'POST',
      body: JSON.stringify(updatedUser.apiinfo[updatedUser.apiinfo.length - 1]),
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((res) => res.json().then((data) => ({
      data,
      status: res.status
    })).then((result) => {
      // Did the request go ok or not?
      if (result.status === 201) {
        // Update the local storage with the new information.
        localStorage.setItem('user', JSON.stringify(result.data));

        // The server was added, so update the state.
        setServerAdded(true);

        // UX thing, give a little time before closing the dialog.
        setTimeout(handleClose, 250);
        setServerInfo('');
        window.location.reload();
      } else {
        // Display whatever the server said.
        console.log('Failed to add the server because: ', result.data.detail);
      }
    }));
  };

  // Set state variables.
  const setInput = (event, which) => {
    // Cases
    if (which === 'public_hostname') {
      // Change the hostname.
      setHostname(event.target.value);
    } else if (which === 'token') {
      // Change token.
      setToken(event.target.value);
    } else if (which === 'email') {
      // Change the email.
      setEmail(event.target.value);
    }
  };

  return (
    <div>
      <Dialog open={showing} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant="h2">
            Add a new BCO server
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h3">
              Enter the hostname below and click &#34;Request Server Information&#34;
              to confirm that you are adding the correct server.
            </Typography>
            <Typography>
              <br />
            </Typography>
            <Typography variant="h3">
              The returned server information is based on the token you provide.
              You must have already received a token from this server.
            </Typography>
            <Typography>
              <br />
            </Typography>
            {/* <Typography variant="h3">
              To request a new, non-public token for the host, enter a hostname and an e-Mail
              and click on &#34;Request New Token&#34;.
            </Typography> */}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="public_hostname"
            label="Public Hostname"
            fullWidth
            onChange={(e) => setInput(e, 'public_hostname')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="token"
            label="Token"
            fullWidth
            onChange={(e) => setInput(e, 'token')}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="email"
            label="e-Mail"
            fullWidth
            onChange={(e) => setInput(e, 'email')}
          /> */}
          <ServerStatus serverStatus={requestStatus} />
          <div className={classes.centered}>
            <Button
              disabled={!(token.length > 0 && hostname.length > 0)}
              color="primary"
              onClick={checkApi}
              variant="contained"
            >
              Verify Account Information
            </Button>
            &nbsp;
          </div>
          {
            Object.keys(serverInfo).length > 0
              ? <ServerSummary raw={serverInfo} />
              : null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!(Object.keys(serverInfo).length > 0)}
            onClick={addServerInfoToUserDb}
            color="primary"
          >
            Add Server
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddServer.propTypes = {
  setShowing: PropTypes.func.isRequired,
  showing: PropTypes.bool.isRequired
}

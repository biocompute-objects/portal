import React, { useState } from 'react';
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

// Get the parent context.
// Source: https://www.pluralsight.com/guides/how-to-use-react-context-to-share-data-between-components
import { useContext } from 'react';
import { ParentContext } from './index';

// Host status
import ServerStatus from './ServerStatus';

// Summary information about the server
import ServerSummary from './ServerSummary';

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center'
  }
}));

export default function FormDialog(props) {
  
  const classes = useStyles();
  
  // Use the parent context.
  // Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
  const { showing, setShowing } = useContext(ParentContext);

  // State variables to hold the server information.
  const [hostname, setHostname] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [serverInfo, setServerInfo] = useState({});

  // TODO: improve error checking.  
  const handleClose = () => {

    setShowing(false);

    // TODO: move later to be more "graceful" on close...
    setRequestStatus('');
    //props.newServer('asdfas');

  };

  // Check if the server and the given key are valid.
  const checkApi = () => {

    // See if this server has already been added.
    var serverAdded = false;

    // TODO: a bit expensive, use a for loop/break paradigm instead.
    JSON.parse(localStorage.getItem('user'))['apiinfo'].map(record => {

      // Already added?
      if(record['public_hostname'] === hostname) {
        serverAdded = true;
      }

    })

    // Was the hostname already added?
    if(serverAdded === false) {

      // Fetch to the server with the given token, if available.
      fetch(hostname + '/api/public/describe/', {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        }).then(response => response.json()).then(data => {
        
        // Instead of using status directly, we'll check for a necessary key.

        // Was the request a success or not?
        if(data['public_hostname'] !== 'undefined') {

          // Update the message.
          setRequestStatus('success');

          // Save the server information.
          setServerInfo(data);

        } else {

          // There was an issue, so alert the user.
          setRequestStatus('failure');

        }

      })

    } else {

      // Indicate the error.
      setRequestStatus('already_added');

    }

  }

  // Ask for a new account.
  const newApiAccount = () => {

    // Ask the server for a new account.
    fetch(hostname, {
      method: 'POST',
      body: JSON.stringify({
        token: token,
        email: email
      }),
      headers: {
        "Authorization": `TOKEN ${localStorage.getItem('token')}`,
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(response => response.json()).then(data => {
        
        // See if this server has already been added.
        var serverAdded = false;

        // TODO: a bit expensive, use a for loop/break paradigm instead.
        JSON.parse(localStorage.getItem('user'))['apiinfo'].map(record => {

          // Already added?
          
          // Slight tweak here as the URL on the host isn't just the
          if(record['hostname'] === data['hostname']) {
            serverAdded = true;
          }

        })

        // Was the hostname already added?
        if(serverAdded === false) {

          // Instead of using status directly, we'll check for a necessary key.

          // Was the request a success or not?
          if(data['hostname'] !== 'undefined') {

            // Update the message.
            setRequestStatus('success');

            // Save the server information.
            setServerInfo(data);

          } else {

            // There was an issue, so alert the user.
            setRequestStatus('failure');

          }

        } else {

          // Indicate the error.
          setRequestStatus('already_added');
    
        }

      })
  }

  // Add the server info to UserDB.
  const addServerInfoToUserDb = () => {

    // Pull the server info straight off the state variable,
    // then add to UserDB.
    var updatedUser = JSON.parse(localStorage.getItem('user'));
    updatedUser['apiinfo'].push(serverInfo);

    // Add the server information to the user's information via userdb call.
    fetch( hostname + '/users/add_api/', {
    method: 'POST',
    body: JSON.stringify(updatedUser['apiinfo'][updatedUser['apiinfo'].length - 1]),
    headers: {
        "Authorization": `JWT ${localStorage.getItem('token')}`,
        "Content-type": "application/json; charset=UTF-8"
    }
    }).then(res => res.json().then(data => ({
        data: data,
        status: res.status
    })).then(res => {
        
        // Did the request go ok or not?
        if(res.status === 201) {

          // Update the local storage with the new information.
          localStorage.setItem('user', JSON.stringify(res.data));

          // The server was added, so update the state.
          // setServerAdded(true);

          // UX thing, give a little time before closing the dialog.
          setTimeout(handleClose, 2500);
        
        } else {
          
          // Display whatever the server said.

        }

    }))

  }

  // Set state variables.
  const setInput = (event, which) => {
		
		// Cases
    if(which === 'public_hostname') {

      // Change the hostname.
			setHostname(event.target.value);

    } else if(which == 'token') {
			
			// Change token.
			setToken(event.target.value);

    } else if(which == 'email') {
        
      // Change the email.
      setEmail(event.target.value);
    
    }

  }

  return (
    <div>
      <Dialog open={showing} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant = 'h1'>
            Add a new BCO server
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant = 'h3'>
              Enter the hostname below and click "Request Server Information" to confirm that you are adding the correct server.
            </Typography>
            <Typography>
              <br />
            </Typography>
            <Typography variant = 'h3'>
              The returned server information is based on the token you provide.  If you've previously received a token from this server, provide it below when requesting the server information.  Otherwise, if you leave the token field blank, the server will automatically use a public token when requesting the server information.
            </Typography>
            <Typography>
              <br />
            </Typography>
            <Typography variant = 'h3'>
              To request a new, non-public token for the host, enter a hostname and an e-Mail and click on "Request New Token".
            </Typography>
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
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="e-Mail"
            fullWidth
            onChange={(e) => setInput(e, 'email')}
          />
          <ServerStatus serverStatus={requestStatus} />
          <div className = {classes.centered}>
            <Button
              color="primary"
              onClick={checkApi}
              variant="contained"
            >
              Request Server Information
            </Button>
            &nbsp;
            <Button
              color="primary"
              variant="contained"
            >
              Request New Token
            </Button>
          </div>
          {
            Object.keys(serverInfo).length > 0
              ?
                <ServerSummary raw = { serverInfo } />
              :
                null
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled = { Object.keys(serverInfo).length > 0 ? false : true } onClick={addServerInfoToUserDb} color="primary">
            Add Server
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}















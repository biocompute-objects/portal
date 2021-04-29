import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Get the parent context.
// Source: https://www.pluralsight.com/guides/how-to-use-react-context-to-share-data-between-components
import { useContext } from 'react';
import { ParentContext } from './index';

// Host status
import ServerStatus from './ServerStatus';

export default function FormDialog(props) {

  // Use the parent context.
  // Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
  const { showing, setShowing, setServerAdded } = useContext(ParentContext);

  // State variables to hold the server information.
  const [hostname, setHostname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [apikey, setApikey] = useState('');
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  // TODO: improve error checking.

  // If all fields are provided, allow the submission to go through.
  useEffect(() => {

    if(hostname !== '' && username !== '' && password !== '') {
      setFieldsFilled(true);
    } else {
      setFieldsFilled(false);
    }

  }, [hostname, username, password])
  
  const handleClose = () => {
    setShowing(false);

    // TODO: move later to be more "graceful" on close...
    setRequestStatus('');
    //props.newServer('asdfas');
  };

  // Set state with new values in text fields.
  

  // Check if the server and the given key are valid.
  const checkApi = () => {

    // Fetch to the server to verify a valid account.

    // TODO: fix hostname to take just the server root IP
    // instead of the full URL with /accounts/describe/.
    fetch(hostname, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
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

            // Add the server information to the user information.
            var updatedUser = JSON.parse(localStorage.getItem('user'));
            updatedUser['apiinfo'].push(data);

            // Add the server information to the user's information via userdb call.
            fetch('http://127.0.0.1:8080/core/add_api/', {
                method: 'POST',
                body: JSON.stringify(updatedUser['apiinfo'][0]),
                headers: {
                    "Authorization": `JWT ${localStorage.getItem('token')}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
                }).then(response=>response.json()).then(data=>{
                  
                  // Update the local storage with the new information.
                  localStorage.setItem('user', JSON.stringify(updatedUser));

                  // The server was added, so update the state.
                  setServerAdded(true);

                  // UX thing, give a little time before closing the dialog.
                  setTimeout(handleClose, 2500);
                
            })

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

  const setInput = (event, which) => {
		
		// Cases
    if(which === 'hostname') {

      // Change the hostname.
			setHostname(event.target.value);

    } else if(which == 'username') {
			
			// Change the API key.
			setUsername(event.target.value);

    } else if(which == 'password') {
        
      // Change the API key.
      setPassword(event.target.value);
    
    } else if(which == 'apikey') {
			
			// Change the API key.
			// setApikey(event.target.value);

    }

  }

  return (
    <div>
      <Dialog open={showing} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new BCO server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When adding a server, you must first create an account on the server.  See [LINK] for instructions.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="hostname"
            label="Hostname"
            fullWidth
            onChange={(e) => setInput(e, 'hostname')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            onChange={(e) => setInput(e, 'username')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            fullWidth
            onChange={(e) => setInput(e, 'password')}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="apikey"
            label="API Key"
            fullWidth
            onChange={(e) => setInput(e, 'apikey')}
          /> */}
          <ServerStatus serverStatus={requestStatus} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled = {!fieldsFilled} onClick={checkApi} color="primary">
            Add Server
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
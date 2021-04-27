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
  const { showing, setShowing } = useContext(ParentContext);

  // State variables to hold the server information.
  const [hostname, setHostname] = useState();
  const [apikey, setApikey] = useState();
  const [requestStatus, setRequestStatus] = useState('');
  
  const handleClose = () => {
    setShowing(false);
    //props.newServer('asdfas');
  };

  // Set state with new values in text fields.
  

  // Check if the server and the given key are valid.
  const checkApi = () => {
    
    // Fetch to the server to verify a valid account.
    fetch(hostname, {
      method: 'POST',
      body: JSON.stringify({
        POST_get_key_permissions: [ 
          {
            apikey: apikey
          }
        ]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(response=>response.json()).then(data=>{
                
        // Was the request a success?
        const requestStatus = data.POST_get_key_permissions[0].request_code;

        if(requestStatus === '200') {

          // Update the message.
          setRequestStatus('success');

          // Get the relevant information from the API.
          console.log(data.POST_get_key_permissions[0]);

          // Add the permissions to the user's information via userdb call.
          fetch('http://127.0.0.1:8080/core/add_api/', {
              method: 'POST',
              body: JSON.stringify({
                  api_hostname: hostname,
                  api_human_readable: "some readable name",
                  api_key: apikey
              }),
              headers: {
                  Authorization: `JWT ${localStorage.getItem('token')}`,
                  "Content-type": "application/json; charset=UTF-8"
              }
              }).then(response=>response.json()).then(data=>{
                
                console.log(data);
                // Update the local storage with the new information.
                localStorage.setItem('user', JSON.stringify(data));

                // UX thing, give a little time before closing the dialog.
                setTimeout(handleClose, 2500);
              
          })
          
        } else if(requestStatus === '404') {

          // Update the message.
          setRequestStatus('failure');

        }
        
    })

  }

  const setInput = (event, which) => {
		
		// Cases
    if(which === 'hostname') {

      // Change the hostname.
			setHostname(event.target.value);

    } else if(which == 'apikey') {
			
			// Change the API key.
			setApikey(event.target.value);

    }

  }

  return (
    <div>
      <Dialog open={showing} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new BCO server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a server, fill out the information below.
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
          <TextField
            autoFocus
            margin="dense"
            id="apikey"
            label="API Key"
            fullWidth
            onChange={(e) => setInput(e, 'apikey')}
          />
          <DialogContentText>
            Click 'Add Server' to verify the API key on the given hostname.
          </DialogContentText>
          <ServerStatus serverStatus={requestStatus} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={checkApi} color="primary">
            Add Server
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
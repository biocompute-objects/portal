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
import { useContext } from 'react'
import { ParentContext } from './index'

export default function FormDialog(props) {
  
  // Set the parent context.
  // Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
  const context = React.useContext(ParentContext);

  // Use the parent context.
  // Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
  const { setShowing } = useContext(ParentContext);

  const handleClose = () => {
    setShowing(false);
    //props.newServer('asdfas');
  };

  return (
    <div>
      <Dialog open={context.showing} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="apikey"
            label="API Key"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add Server
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
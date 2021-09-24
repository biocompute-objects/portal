// Source: https://material-ui.com/components/dialogs/#alerts

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';

export default function PublishDialog({ open, publishMessage, retainDraft, setRedirect, setRetainDraft, setOpen, setter }) {
    
    // Close handler
    const handleClose = () => {
        setOpen(false);
    };

    // Cancel or publish?
    const cancelOrPublishOrRedirect = (which) => {

        // Set everything based on the decision.
        if(which === 'cancel') {
            
            handleClose();

        } else if(which === 'publish') {
            
            setter(1);
            
        } else if(which === 'redirect') {

            setRedirect(true);

        }

    }

    return (
        <div>
        <Dialog
            open = { open }
            onClose = { handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {/*
                    Object.keys(publishMessage).length === 0
                        ?
                            <Typography variant = 'h2'>
                                Confirm draft publishing
                            </Typography>
                        :
                            <Typography variant = 'h2'>
                                Draft published succesfully!
                            </Typography>
                */}
                
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {
                        Object.keys(publishMessage).length === 0
                            ?
                                <Typography>
                                    Click "Publish" to confirm publishing your draft object, or "Cancel" to return to the Builder.
                                </Typography>
                            :
                                <Typography>
                                    {publishMessage['message']}
                                </Typography>
                    }
                </DialogContentText>
            </DialogContent>
            {
                Object.keys(publishMessage).length === 0
                    ?
                    <DialogActions>
                        <FormControlLabel
                            control = {
                                <Checkbox checked = { retainDraft } onChange = { (event) => setRetainDraft( event.target.checked ) } /> 
                            }
                            label = 'Retain draft after publishing'
                        />
                        <Button onClick = { () => cancelOrPublishOrRedirect('cancel') } color="primary">
                            Cancel
                        </Button>
                        <Button onClick = { () => cancelOrPublishOrRedirect('publish') } color="primary" autoFocus>
                            Publish
                        </Button>
                    </DialogActions>
                    :
                    <DialogActions>
                        <Button onClick = { () => cancelOrPublishOrRedirect('cancel') } color="primary">
                            Close
                        </Button>
                        <Button onClick = { () => cancelOrPublishOrRedirect('redirect') } color="primary">
                            Take me to the object
                        </Button>
                    </DialogActions>
            }
        </Dialog>
        </div>
    );
}

// Source: https://material-ui.com/components/autocomplete/#combo-box

/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
import { DeepContext } from '../../BuilderView';
import { Typography } from '@material-ui/core';

export default function ServersHostnamesGroups({ items, savingLocation, serverLock, setSaveTo }) {
    
    // State
    const [selectedValue, setSelectedValue] = React.useState([]);

    // From the context
    const { objectOwner, retrievedDraft } = useContext(DeepContext);
    
    // Some quick processing to make the keys usable.
    const processed = [];

    items.map(item => {
        Object.keys(item['other_info']['group_permissions']).map(subitem => {
            
            // Only add a group if 'add' or 'change' permissions are there.
            if(item['other_info']['group_permissions'][subitem].findIndex(element => element.includes('add', 'change')) >= 0) {
                processed.push({ 
                    hostname: item['public_hostname'],
                    human_readable_hostname: item['human_readable_hostname'],
                    group: subitem
                });
            }

        })

    });

    // Listen for a change in the saving information FROM
    // the parent.
    // TODO: implement...
    // useEffect(() => {
        
    //     // Check for null...
    //     if(selectedValue === null) {
    //         setSaveTo([])
    //     } else {
    //         setSaveTo(selectedValue)
    //     }
        
    // }, [savingLocation])

    // Listen for a change in the saving information,
    // then kick it back up to the parent(s).
    useEffect(() => {
        
        // Check for null...
        if(selectedValue === null) {
            setSaveTo([])
        } else {
            setSaveTo(selectedValue)
        }
        
    }, [selectedValue])
  
    return (
        retrievedDraft === true
            ?
                <Autocomplete
                    disabled = { serverLock }
                    fullWidth
                    inputValue = { objectOwner }  
                    onChange={(event, newValue) => {
                        setSelectedValue(newValue)
                    }}
                    options={processed}
                    getOptionLabel={(option) => option.hostname + ' - ' + option.human_readable_hostname + ' (' + option.group + ')'}
                    renderInput={(params) => <TextField {...params} label="Select server to save to."/>}
                />
            :
                <Autocomplete
                    disabled = { serverLock }
                    fullWidth  
                    onChange={(event, newValue) => {
                        setSelectedValue(newValue)
                    }}
                    options={processed}
                    getOptionLabel={(option) => option.hostname + ' - ' + option.human_readable_hostname + ' (' + option.group + ')'}
                    renderInput={(params) => <TextField {...params} label="Select server to save to."/>}
                />
  );
}
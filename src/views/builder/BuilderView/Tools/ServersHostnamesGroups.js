// Source: https://material-ui.com/components/autocomplete/#combo-box

/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ServersHostnamesGroups({ items, savingFunction }) {
    
    // State
    const [selectedValue, setSelectedValue] = React.useState([]);
    
    // Some quick processing to make the keys usable.
    const processed = [];

    items.map(item => {
        Object.keys(item['other_info']['group_permissions']).map(subitem => {
            
            // Only add a group if 'add' or 'change' permissions are there.
            if(item['other_info']['group_permissions'][subitem].findIndex(element => element.includes('add', 'change')) >= 0) {
                processed.push({ 
                    hostname: item['hostname'],
                    human_readable_hostname: item['human_readable_hostname'],
                    group: subitem
                });
            }

        })

    });

    // Listen for a change in the saving information,
    // then kick it back up to the parent(s).
    useEffect(() => {
        
        // Check for null...
        if(selectedValue === null) {
            savingFunction([])
        } else {
            savingFunction(selectedValue)
        }
        
    }, [selectedValue])
  
    return (
        <Autocomplete
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
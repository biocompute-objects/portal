// Source: https://material-ui.com/components/autocomplete/#combo-box

/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
import { DeepContext } from '../../BuilderView';

export default function ServersHostnamesGroups({ items, savingLocation, serverLock, setObjectId, setSaveTo, type }) {
    
    // State
    const [selectedValue, setSelectedValue] = React.useState([]);
    console.log('type(setSaveTo): ', typeof(setSaveTo))
    console.log('type(setObjectId): ', typeof(setObjectId))

    // From the context
    const { objectOwner, retrievedDraft } = useContext(DeepContext);
    
    // Some quick processing to make the keys usable.
    const processed = [];

    // Render the options for servers based on the type of server
    // list we have.
    items.map(item => {
        Object.keys(item['other_info']['group_permissions']).map(subitem => {
            
            if(subitem.indexOf('draft') >= 0 && type === 'draft') {

                // Only add a group if 'add' or 'change' permissions are there.
                if(item['other_info']['group_permissions'][subitem].findIndex(element => element.includes('add', 'change')) >= 0) {
                    processed.push({ 
                        hostname: item['public_hostname'],
                        human_readable_hostname: item['human_readable_hostname'],
                        group: subitem
                    });
                }

            } else if(subitem.indexOf('publish') >= 0 && type === 'publish') {

                // Only add a group if 'add' or 'change' permissions are there.
                if(item['other_info']['group_permissions'][subitem].findIndex(element => element.includes('add', 'change')) >= 0) {
                    processed.push({ 
                        hostname: item['public_hostname'],
                        human_readable_hostname: item['human_readable_hostname'],
                        group: subitem
                    });
                }

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
            setSaveTo([]);
            // setObjectId('');
        } else {
            setSaveTo(selectedValue);
            // setObjectId(selectedValue);
        }
        
    }, [selectedValue])
  
    return (
        retrievedDraft === true
            ?
                <Autocomplete
                    disabled = { type === 'draft' ? serverLock : serverLock === false ? true : false }
                    fullWidth
                    inputValue = { objectOwner }  
                    onChange={(event, newValue) => {
                        setSelectedValue(newValue)
                    }}
                    options={processed}
                    getOptionLabel={(option) => option.hostname + ' - ' + option.human_readable_hostname + ' (' + option.group + ')'}
                    renderInput={(params) => <TextField {...params} label={ type === 'draft' ? "Select server to save draft to." : "Select server to publish draft to." } />}
                />
            :
                <Autocomplete
                    disabled = { type === 'draft' ? serverLock : serverLock === false ? true : false }
                    fullWidth  
                    onChange={(event, newValue) => {
                        setSelectedValue(newValue)
                    }}
                    options={processed}
                    getOptionLabel={(option) => option.hostname + ' - ' + option.human_readable_hostname + ' (' + option.group + ')'}
                    renderInput={(params) => <TextField {...params} label={ type === 'draft' ? "Select server to save draft to." : "Select server to publish draft to." } />}
                />
  );
}
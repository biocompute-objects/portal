// Source: https://material-ui.com/components/autocomplete/#combo-box

/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';

export default function ServerList({ disabledValue, options, receivedDefault, setter, type }) {

    // Some quick processing to make the keys usable.
    const processed = [];

    // Render the options for servers based on the type of server
    // list we have.
    options.map(item => {

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
    
    // Trouble with inputValue, so split the logic.
    return (
        receivedDefault !== null
            ?
                <Autocomplete
                    disabled = { disabledValue }
                    fullWidth
                    inputValue = { receivedDefault }  
                    onChange={ (event, newValue) => {
                        newValue === null
                            ?
                                setter('')
                            :
                                setter(newValue['hostname'] + ' - ' + newValue['group'])
                    } }
                    options={ processed }
                    getOptionLabel={ (option) => option.hostname + ' - ' + option.human_readable_hostname + ' (' + option.group + ')' }
                    renderInput={ (params) => <TextField {...params} label = { type === 'draft' ? "Select server to save draft to." : "Select server to publish draft to." } />}
                />
            :
                <Autocomplete
                    disabled = { disabledValue }
                    fullWidth 
                    onChange={ (event, newValue) => {
                        newValue === null
                            ?
                                setter('')
                            :
                                setter(newValue['hostname'] + ' - ' + newValue['group'])
                    } }
                    options={ processed }
                    getOptionLabel={ (option) => option.hostname + ' - ' + option.human_readable_hostname + ' (' + option.group + ')' }
                    renderInput={ (params) => <TextField {...params} label = { type === 'draft' ? "Select server to save draft to." : "Select server to publish draft to." } />}
                />
    );

}



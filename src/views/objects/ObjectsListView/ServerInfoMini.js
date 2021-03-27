// Source: https://material-ui.com/components/selects/#customized-selects

import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Typography } from '@material-ui/core';

// For new drafts
import { Button } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ServerDropdown() {
  
  const classes = useStyles();

  // Set the server and server options.
  const [server, setServer] = React.useState('');
  const [serverOptions, setServerOptions] = React.useState([]);

  const handleChange = (event) => {
    setServer(event.target.value);
  };

    // Get the available servers from the user's stored information.
    useEffect(() => {

        // Is the user set?
        if(localStorage.getItem('user')) {
            
            // For each server and API key, hit the server to
            // get the available prefixes.

            // Source: https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
            // Source: https://stackoverflow.com/a/59037919/5029459
            
            // Define the servers to hit.
            const servers = JSON.parse(localStorage.getItem('user'))['apiinfo'];
            
            // Try each one.
            Promise.all(servers.map(item => 
                fetch('http://' + item['hostname'] + '/api/description/permissions/', {
                    method: 'POST',
                    body: JSON.stringify({
                        POST_get_key_permissions: [ 
                            {
                                apikey: item['apikey']
                            }
                        ]
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    }).then(response=>response.json()).then(data=>{ 
                        
                        // Construct a string for each server.
                        var constructed = [];

                        data.POST_get_key_permissions.map(subitem => {
                            
                            subitem['content']['available_prefixes'].map(subsubitem => {
                                constructed.push(item['hostname'] + ' - ' + subsubitem);
                            })

                        })
                        console.log('constructed:', constructed)
                        // Set the available servers.
                        setServerOptions(constructed); 
                })
              ));
              
            //setServer()

        }
        
    }, [])

  return (
    <div>
      <Typography>
          Select a server and a prefix below to draft a new object.
      </Typography>
      <FormControl className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={server}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              serverOptions.map(item => (
                    <MenuItem value={item}>{item}</MenuItem>
                )
              )
          }
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <Button 
            className={classes.exportButton}
            color="primary"
            variant="contained"
            >
            New Draft >
        </Button>
      </FormControl>
    </div>
  );
}

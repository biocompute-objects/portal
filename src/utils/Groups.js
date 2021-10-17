// Source: https://material-ui.com/components/autocomplete/#combo-box

/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Groups({ items }) {
  
    // Some quick processing to make the keys usable.
    const processed = [];

    const handleChange = () => {
        alert('here')
    }

    items.map(item => {
        processed.push({ name: item });
    });

    // Default value: https://stackoverflow.com/questions/61213634/assigning-default-value-to-autocomplete-in-materialui-and-react-js
  
    return (
        <Autocomplete
            defaultValue={{ name: 'None'}}
            id="combo-box-demo"
            onChange={handleChange}
            options={processed}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
        />
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: '0',
    marginRight: '0',
    minWidth: 90,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LogicField() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Prefix</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>BCO</MenuItem>
          <MenuItem value={10}>GLY</MenuItem>
          <MenuItem value={20}>ONCO</MenuItem>
          <MenuItem value={30}>HIVE</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

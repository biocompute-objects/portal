import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Based on https://material-ui.com/components/selects/#simple-select

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ContributionReviewer() {

  const classes = useStyles();
  const [contribution, setContribution] = React.useState('');

  const handleChange = (event) => {
    setContribution(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} error>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={contribution}
          onChange={handleChange}
        >
          <MenuItem value={"unreviewed"}>unreviewed</MenuItem>
          <MenuItem value={"in-review"}>in-review</MenuItem>
          <MenuItem value={"approved"}>approved</MenuItem>
          <MenuItem value={"rejected"}>rejected</MenuItem>
          <MenuItem value={"suspended"}>suspended</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

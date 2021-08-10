import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function StatusReviewer({ error, item, index, setInput }) {

  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl} error={error}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.status}
          onChange={(e) => setInput(e, index, 'status', 'pdReview')}
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

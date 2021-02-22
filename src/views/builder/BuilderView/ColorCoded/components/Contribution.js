import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

// Based on https://material-ui.com/components/selects/#multiple-select

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const contributions = [
	'authoredBy',
	'contributedBy',
	'createdAt',
	'createdBy',
	'createdWith',
	'curatedBy',
	'derivedFrom',
	'importedBy',
	'importedFrom',
	'providedBy',
	'retrievedBy',
	'retrievedFrom',
	'sourceAccessedBy'
];

function getStyles(name, contribution, theme) {
  return {
    fontWeight:
      contribution.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Contribution() {

  const classes = useStyles();
  const theme = useTheme();

  const [contribution, setContribution] = React.useState([]);

  const handleChange = (event) => {
    setContribution(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
					fullWidth
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={contribution}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {contributions.map((contrib) => (
            <MenuItem key={contrib} value={contrib} style={getStyles(contrib, contribution, theme)}>
              {contrib}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

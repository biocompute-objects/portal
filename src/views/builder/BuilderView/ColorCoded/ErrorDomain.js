import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, withStyles, Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import JsonView from 'src/components/JsonView';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    color: 'black'
  },
}));

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object and whether or not its keys are properties.
export default function ErrorDomain({ items }) {
  const inputClasses = useStyles();
  const classes = withStyles();
  console.log('working', items);

  return (
    <Table size="small">
      <TableHead className={classes.tabled}>
        <TableRow>
          <StyledCell colSpan="6">
            <Button
              variant="contained"
              // color="D5D8DC"
              fullWidth
              onClick={() => window.open('https://docs.biocomputeobject.org/error-domain/')}
            >
              <Typography variant="h1">
                Error Domain &nbsp;
                <HelpIcon />
              </Typography>
            </Button>
          </StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <JsonView
            jsonContents={items.empirical}
            setJsonContents={items.setEmpirical}
            header="Empirical Error Subdomain"
            rows={4}
          />
        </TableRow>
        <TableRow>
          <JsonView
            jsonContents={items.algorithmic}
            setJsonContents={items.setAlgorithmic}
            header="Algorithmic Error Subdomain"
            rows={4}
          />
        </TableRow>
      </TableBody>
    </Table>
  );
}

ErrorDomain.propTypes = {
  items: PropTypes.any.isRequired
};

import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// Server status
//import { useState } from 'react';

// Permissions
import Permissions from './Permissions'

// Add server button
import {
  Button
} from '@material-ui/core';

// Server status chips
import Chip from '@material-ui/core/Chip';

// Get the parent context.
// Source: https://www.pluralsight.com/guides/how-to-use-react-context-to-share-data-between-components
import { useContext } from 'react'
import { ParentContext } from './index'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'servername', numeric: false, disablePadding: true, label: 'Server Name' },
  { id: 'hostname', numeric: true, disablePadding: false, label: 'Hostname' },
  { id: 'token', numeric: false, disablePadding: false, label: 'Token' },
  { id: 'permissions', numeric: false, disablePadding: false, label: 'Permissions' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // Get the status of each API
  //const [count, setCount] = useState(0);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
          BioCompute Object Servers
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  serverActive : {
    backgroundColor: 'green',
    width: '70.2667px'
  },
  serverInactive : {
    backgroundColor: 'red',
    width: '70.2667px'
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

// For creating user data.
function createData(servername, hostname, token, permissions, status) {
  return { servername, hostname, token, permissions, status };
}

export default function EnhancedTable({ onClickOpen }) {
  
  const classes = useStyles();
  
  // State
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('servername');
  const [selected, setSelected] = React.useState([]);
  const [permissions, setPermissions] = React.useState([]);
  const [updatedUser, setUpdatedUser] = React.useState(false);

  // All user information.
  // const [rows, setRows] = React.useState([
  //   createData('NIH', '23.423.13.45', 'carmstrong', 'Read, Write', 'Active'),
  //   createData('FDA', '3.33.41.435', 'carmstrong', 'Read', 'Inactive')
  // ]);
  const [rows, setRows] = React.useState([]);

  // Set the parent context setters.
  // Source: https://stackoverflow.com/questions/58936042/pass-context-between-siblings-using-context-in-react
  const { setShowing, serverAdded, setServerAdded } = useContext(ParentContext);

  // Get the credentials from the user's most recently stored credentials.
  useEffect(() => {
    
    // Define an array to hold the permissions.
    var perms = [];

    // Get the permissions.
    setPermissions(JSON.parse(localStorage.getItem('user'))['apiinfo']);

    permissions.map(perm => {
      perms.push(
        createData(
          perm['human_readable_hostname'],
          perm['hostname'],
          perm['token'],
          perm['other_info']['group_permissions'],
          'Active'
        )
      )
    })

    // Update the server info.
    setRows(perms);
    console.log('rows:', rows)

    // The server added flag is no longer necessary.
    setServerAdded(false);

  }, [serverAdded])

  // Create a function to add a new server row to the table.
  // Source: https://webomnizz.com/change-parent-component-state-from-child-using-hooks-in-react/
  function newServer(serverInfo) {
    setRows(serverInfo);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                    const isItemSelected = isSelected(row.servername);
                    const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.servername)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.servername}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.servername}
                          </TableCell>
                          <TableCell align="left">{row.hostname}</TableCell>
                          <TableCell align="left">
                            {/* <Button
                              color="primary"
                              onClick={() => setShowing(true)}
                              variant="contained"
                            >
                              Set credentials
                            </Button> */}
                            {row.token}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              color="primary"
                              fullWidth
                              onClick={() => setShowing(true)}
                              variant="contained"
                            >
                              Show permissions
                            </Button>
                            <Permissions permissionSet = {row.permissions}/>
                          </TableCell>
                          <TableCell align="center"><Chip className={row.status === "Active" ? classes.serverActive : classes.serverInactive} color='primary' label={row.status}></Chip></TableCell>
                        </TableRow>
                      );
                    }
                  )}
              <TableRow
              >
                <TableCell align="center" colSpan={7}>
                  <Button
                    color="primary"
                    onClick={() => setShowing(true)}
                    rows={rows}
                    newServer={newServer}
                    variant="contained"
                  >
                    Add Server
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

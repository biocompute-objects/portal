// Source: https://material-ui.com/components/tables/#sorting-amp-selecting

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// Groups
import Groups from './Groups';

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
  { id: 'hostname', numeric: false, disablePadding: true, label: 'Hostname' },
  { id: 'human_readable_hostname', numeric: false, disablePadding: true, label: 'Human-Readable Hostname' },
  { id: 'group', numeric: true, disablePadding: false, label: 'Group' },
  { id: 'change', numeric: true, disablePadding: false, label: 'Change' },
  { id: 'del', numeric: true, disablePadding: false, label: 'Delete' },
  { id: 'publish', numeric: true, disablePadding: false, label: 'Publish' },
  { id: 'view', numeric: true, disablePadding: false, label: 'View' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
            align={headCell.numeric ? 'right' : 'left'}
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
      {/* {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
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
      )} */}
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

export default function Sharing({ objectId }) {
  
  const classes = useStyles();


  // --- State --- //
  

  // Server/group information.
  const [rows, setRows] = React.useState([]);
  const [serverGroupInfo, setServerGroupInfo] = React.useState({});

  // TODO: put this state variable in later to reduce redundancy.
  const [serverToken, setServerToken] = React.useState('');

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('group');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Checkboxes
  // Source: https://material-ui.com/components/checkboxes/#basic-checkboxes
  const [checked, setChecked] = React.useState(true);


  // --- Functions --- //

  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.hostname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, hostname) => {
    const selectedIndex = selected.indexOf(hostname);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, hostname);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (hostname) => selected.indexOf(hostname) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChange = (event, hostname, group, perm) => {
    
    // Try the server, and if it's unresponsive,
    // tell the user.

    // TODO: eventually have logic for allowing sharing with other
    // servers...
    const splitUp = objectId.split('/linked/');
    var helper = splitUp[0].split('/builder/')[1]
    var hostname = helper.split('/');
    hostname.pop();
    hostname[0] = hostname[0] + ':/';
    hostname = hostname.join('/');
    const oI = splitUp[0].replace('/builder/', '').replace('/', '://');
    const token = splitUp[1];

    console.log(oI)
    console.log(hostname + '/api/objects/permissions/set/')
    console.log(group)
    console.log(perm)
    
    fetch(hostname + '/api/objects/permissions/set/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'object_id': oI,
            'group': group,
            'perm': perm
        })
        }).then(res => res.json().then(data => ({
            data: data,
            status: res.status
        })).then(res => {
            
            // Did the request go ok or not?
            if(res.status === 404) {

                // There were no (positive) permissions at all.

                console.log('No permissions...')
            
            } else if(res.status === 200) {

                // There WERE (positive) permissions.

                // Define the permissions.
                var perms = {
                    [res.data.hostname]: {
                        'human_readable_hostname': res.data.human_readable_hostname,
                        'groups': res.data.groups
                    }
                }

                // Set the permissions.
                setServerGroupInfo(perms);
                
                console.log(res.data)
                console.log('Permissions...')

            }

        })
    )

    setChecked(event.target.checked);

  };

  // Check an array for a substring.
  const checkArrayForSubstring = (searchable, what) => {
      return searchable.findIndex(element => element.includes(what)) >= 0
  }

  // Wait for everything to load, then populate.
  useEffect(() => {

    console.log('SENDABLE:', objectId)
    // First, ask the server for the permissions.

    // Get the hostname, actual object ID, and token.
    // TODO: change 
    const splitUp = objectId.split('/linked/');
    var helper = splitUp[0].split('/builder/')[1]
    var hostname = helper.split('/');
    hostname.pop();
    hostname[0] = hostname[0] + ':/';
    hostname = hostname.join('/');
    const oI = splitUp[0].replace('/builder/', '').replace('/', '://');
    const token = splitUp[1];

    console.log('OTHER INFO')
    console.log(hostname)
    console.log(oI)
    console.log(token)
    
    fetch(hostname + '/api/objects/permissions/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'object_id': oI
        })
        }).then(res => res.json().then(data => ({
            data: data,
            status: res.status
        })).then(res => {
            
            // Did the request go ok or not?
            if(res.status === 404) {

                // There were no (positive) permissions at all.

                console.log('No permissions...')
            
            } else if(res.status === 200) {

                // There WERE (positive) permissions.

                // Define the permissions.
                var perms = {
                    [res.data.hostname]: {
                        'human_readable_hostname': res.data.human_readable_hostname,
                        'groups': res.data.groups
                    }
                }

                // Set the permissions.
                setServerGroupInfo(perms);
                
                console.log(res.data)
                console.log('Permissions...')

            }

        })
    )
    
    // Add each server and credential.

    // We only push for the rows once,
    // but use a dictionary to actually
    // interact with APIs.  This saves
    // The annoyance of having to iterate
    // over the list of rows.
    // var creds = [];
    // var serverGroupHelper = {};

    // // Pull the server/group information out of storage.
    // JSON.parse(localStorage.getItem('user'))['apiinfo'].map(item => {
        
    //     // Not sure why I couldn't put these straight in the push...
    //     const hostname = item.hostname;
    //     const human_readable_hostname = item.human_readable_hostname;

    //     // Groups are a little tricker.
    //     var groups = {};

    //     // Add the option for no one or everyone.
    //     groups['All'] = {
    //         'change': 0,
    //         'delete': 0,
    //         'publish': 0,
    //         'view': 0
    //     }

    //     groups['None'] = {
    //         'change': 0,
    //         'delete': 0,
    //         'publish': 0,
    //         'view': 0
    //     }

    //     // EXCLUDE the self group.
    //     Object.keys(item.other_info.group_permissions).map(group => {
            
    //         if(group !== item.username) {
    //             groups[group] = {
    //                 'change': 0,
    //                 'delete': 0,
    //                 'publish': 0,
    //                 'view': 0
    //             }
    //         }

    //     });

    //     console.log('groups...', groups)
        
    //     // Push for the rows.
    //     creds.push({ hostname, human_readable_hostname, groups });

    //     // Define the object field.
    //     serverGroupHelper[hostname] = {
    //         'groups': groups
    //     }

    // });
      
    // setRows(creds);
    // setServerGroupInfo(serverGroupHelper);

  }, []);

  // Change rows whenever the server/group information changes.
  useEffect(() => {
    
    if(Object.keys(serverGroupInfo).length > 0) {
    
        console.log('server...', serverGroupInfo)
        console.log('rows...', rows)

        // The rows are based on one group description
        // per hostname.

        var newRows = [];

        Object.keys(serverGroupInfo).map(item => {
            
            // Set all the info.
            // TODO: find more concise way to do this.
            const info = serverGroupInfo[item];

            const hostname = item;
            const human_readable_hostname = info.human_readable_hostname;

            Object.keys(info['groups']).map(group => {
                newRows.push({ hostname, human_readable_hostname, group });
            });
            
        });

        // Set the rows.
        setRows(newRows);

    }

  }, [serverGroupInfo]);

  useEffect(() => {
      
    console.log('ROWS...', rows);

  }, [rows]);


  // Substring search: https://stackoverflow.com/a/52124191/5029459
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
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
              {
                    stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {

                            const isItemSelected = isSelected(row.hostname);
                            const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.hostname)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.hostname}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.hostname}
                                        </TableCell>
                                        <TableCell align="right">{row.human_readable_hostname}</TableCell>
                                        <TableCell align="right">
                                            {row.group}
                                            {/* <Groups items = { row.group }/> */}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked = { checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'change') ? true : false }
                                                onChange={(e) => handleChange(e, row.hostname, row.group, checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'change') ? 'unchange' : 'change')}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked = { checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'delete') ? true : false }
                                                onChange={(e) => handleChange(e, row.hostname, row.group, checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'delete') ? 'undelete' : 'delete')}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />    
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked = { checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'add') ? true : false }
                                                onChange={(e) => handleChange(e, row.hostname, row.group, checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'add') ? 'unpublish' : 'publish')}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked = { checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'view') ? true : false }
                                                onChange={(e) => handleChange(e, row.hostname, row.group, checkArrayForSubstring(serverGroupInfo[row.hostname]['groups'][row.group], 'view') ? 'unview' : 'view')}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                            );
                        }
                    )
                }
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

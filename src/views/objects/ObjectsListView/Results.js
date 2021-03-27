import React from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// For object previews.
import BcoPreviewPopup from '../../../utils/bcoPreviewPopup'

// Links
import Linker from './Linker'

// Derive from
import Button from '@material-ui/core/Button';

// Dummy redirecting after draft object creation.
// See https://www.codegrepper.com/code-examples/javascript/useHistory+is+not+exported+form+react-router-dom
import { useNavigate } from 'react-router-dom';

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

// const headCells = [
//   { id: 'objectId', numeric: false, disablePadding: true, label: 'Object ID' },
//   { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
//   { id: 'state', numeric: false, disablePadding: false, label: 'State' },
//   { id: 'source', numeric: true, disablePadding: false, label: 'Source' },
//   { id: 'lastUpdated', numeric: true, disablePadding: false, label: 'Last Updated' }
// ];

const headCells = [
  { id: 'objectId', numeric: false, disablePadding: true, label: 'BCO Accession' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'state', numeric: false, disablePadding: false, label: 'State' },
  { id: 'derivation', numeric: false, disablePadding: false, label: 'Derive Draft'}
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
            align={'left'}
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
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          BioCompute Objects
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

export default function Results({ rowInfo }) {
  
  // For development only.
  const addPortNumber = (uri) => {

    // Add port number 3000.

    // Look for the index of the localhost url.
    const localhostUrlIndex = uri.indexOf('127.0.0.1');

    // Construct the new URI.
    const newUri = uri.substring(0,localhostUrlIndex+9) + ':3000/' + uri.substring(localhostUrlIndex+10, uri.length);

    return(newUri);

  }

  // Redirects
  let history = useNavigate();

  function redirect(where) {
    return history(where);
  }

  // Derive a new object from an existing one.
  const deriveFrom = (uri) => {

    // Call the API to get the existing information,
    // then call the API to create the draft.

    // TODO: Make API function later...

    // Parse the table name (taken from /views/objects/ObjectView/index.js)

    // TODO: Abstract to general function later?

    // The table to use is based on the URI.

    // Check against the REGEX to determine the table.

    // Simply check for two underscores for a draft table,
    // otherwise we have a publish table.

    var table = '';

    if(uri.indexOf('DRAFT') !== -1) {

      // Draft table.
      
      // Get the prefix.
      table = uri.split('/');
      table = table.splice(-1)[0];
      table = table.split('_')[0];
      table = table + '_draft';
      table = table.toLowerCase();

      // ALSO need to remove the 'builder' prefix.
      uri = uri.replace('/builder/', '/');

    } else {

      // Publish table.

      // Get the prefix.
      table = uri.split('/');
      table = table.splice(-2)[0];
      table = table.split('_')[0];
      table = table + '_publish';
      table = table.toLowerCase();

    }
    console.log('table:', table)
    // Call the API.
    //fetch('http://127.0.0.1:8000/bco/objects/read/', {
     fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/read/', {
    
        method: 'POST',
        body: JSON.stringify({
          POST_read_object: [
              {
                table: table, 
                object_id: uri
              }
          ]
  
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      }).then(response=>response.json()).then(data=>{
        
        console.log('+++++++++++++++++', data);
  
        // Get the bulk response.
        const bulkResponse = data.POST_read_object[0];
  
        // Was the object found?
        if(bulkResponse.request_code === '200') {
          
          // Create the draft and re-direct.

          // Swap out the publish table for the draft table
          // if a publish table was initially provided.
          
          if(table.indexOf('publish') !== -1) {

            table = table.replace('publish', 'draft');

          }
          
          //fetch('http://127.0.0.1:8000/bco/objects/create/', {
          fetch('https://beta.portal.aws.biochemistry.gwu.edu/bco/objects/create/', {
            body: JSON.stringify({
              POST_create_new_object: [
                  {
                    table: table,
                    schema: 'IEEE',
                    contents: bulkResponse.content,
                    state: 'DRAFT'
                  }
              ]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
          }).then(response=>response.json()).then(data=>{
      
            console.log('NEW DRAFT OBJECT: ', data);
      
            // Parse the response data for the URL to re-direct to,
            // making sure we're going to the BUILDER page.
      
            // Split the URI and re-construct the route.
            const splitUp = data.POST_create_new_object[0]['object_id'].split('/').splice(-1);
      
            // Now re-direct.
            redirect('/builder/' + splitUp);
      
            // Crappy but works.
            // Source: https://reactgo.com/react-refresh-page/
            //window.location.reload();
      
          })
  
        } else {
  
          // There was a problem, so show what it was...

          // TODO: necessary to do this?
    
        }
  
      })

  }
  
  // The row data from the parent.
  const rows = rowInfo;
  
  const classes = useStyles();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('state');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.objectId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.objectId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        <BcoPreviewPopup bcoLink={row.objectId} />
                      </TableCell> */}
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Linker color = { 'blueLink' } uri={ window.location.href.indexOf(':3000') !== -1 ? addPortNumber(row.objectId) : row.objectId } accessionOnly = { true } state = { row.state } />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" disableElevation onClick = {() => deriveFrom(row.objectId)}>
                          Derive
                        </Button>
                      </TableCell>
                      {/* <TableCell>{row.source}</TableCell>
                      <TableCell>{row.lastUpdated}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
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

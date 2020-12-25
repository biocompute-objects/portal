import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

// Permission statuses
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  permissionFull: {
    backgroundColor: 'green',
    color: 'white'
  },
  permissionList: {
    borderBottom: 'none'
  },
  permissionNone: {
    backgroundColor: 'red',
    color: 'white'
  },
  permissionPartial: {
    backgroundColor: 'orange'
  },
  table: {
    minWidth: 0,
  },
});

const sample_permissions = {"DRUGREVIEW": 
  {"new_drugs": 
    {"read": "all", 
    "write": "all", 
    "execute": "all"},
    "old_drugs": 
    {"read": "authored", 
    "write": "group", 
    "execute": "no"}
  },
  "BCOGroup": 
  {"biostats": 
    {"read": "http://biocomputeobject.org/bco/v_(\d+)", 
    "write": "yes", 
    "execute": "no"}
  }
}

export default function Permissions() {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} size="small">
        <TableBody>
          {
            Object.keys(sample_permissions).map(
              (key, i) => (
                Object.keys(sample_permissions[key]).map(
                  (subkey, j) => (
                    Object.keys(sample_permissions[key][subkey]).map(
                      (subsubkey, k) => {

                        // Declare the pointers to the top-level object.
                        const keys_pointer = Object.keys(sample_permissions[key][subkey]);
                        const values_collapsed = Object.values(sample_permissions[key][subkey][subsubkey]).join('');

                        // Split the processing into the first row and subsequent rows.
                        return(
                          k == 0
                            ? <TableRow key={key}>
                                <TableCell rowSpan={keys_pointer.length}>{key}</TableCell>
                                <TableCell align="right" rowSpan={keys_pointer.length}>{subkey}</TableCell>
                                <TableCell align="right" className={classes.permissionList}>
                                  {
                                    values_collapsed == "no" 
                                      ? <Chip size="small" className={classes.permissionNone} label={subsubkey} />
                                      : values_collapsed == "all" 
                                      ? <Chip size="small" className={classes.permissionFull} label={[subsubkey, values_collapsed].join(' ')} />
                                      : <Chip size="small" className={classes.permissionPartial} label={[subsubkey, values_collapsed].join(' ')} />
                                  }
                                </TableCell>
                              </TableRow>
                            : 
                              <TableRow key={key}>
                                <TableCell align="right" className={classes.permissionList}>
                                  {
                                    values_collapsed == "no" 
                                      ? <Chip size="small" className={classes.permissionNone} label={subsubkey} />
                                      : values_collapsed == "all" 
                                      ? <Chip size="small" className={classes.permissionFull} label={[subsubkey, values_collapsed].join(' ')} />
                                      : <Chip size="small" className={classes.permissionPartial} label={[subsubkey, values_collapsed].join(' ')} />
                                  }
                                </TableCell>
                              </TableRow>
                        )
                      }
                    )
                  )
                )
              )
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

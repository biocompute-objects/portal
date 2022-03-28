// src/views/account/AccountView/ServerInfo.js

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Checkbox, Table, TableBody, TableCell, Typography, TableHead, TableRow
} from '@material-ui/core';
import { FetchContext } from 'src/App';

export default function ServerInfo({ setShowing }) {
  const [serverChange, setServerChange] = useState(null);
  const fc = useContext(FetchContext);
  const [permissions, setPermissions] = useState(JSON.parse(localStorage.getItem('user')).apiinfo);
  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: 'servername', numeric: false, disablePadding: true, label: 'Server Name'
    },
    {
      id: 'hostname', numeric: true, disablePadding: false, label: 'Hostname'
    },
    {
      id: 'token', numeric: false, disablePadding: false, label: 'Token'
    },
    {
      id: 'groups', numeric: false, disablePadding: false, label: 'Groups'
    },
    {
      id: 'status', numeric: false, disablePadding: false, label: 'Status'
    },
  ];

  function selectAll() {
    console.log('A CHANGE!');
    setServerChange(true);
  }

  const deleteServer = (event, servername) => {
    const userConfirm = window.confirm('Are you sure you want to delete these rows?');
    const selectedRows = [];
    if (userConfirm) {
      selectedRows.push(servername);
      fetch(fc.sending.userdb_removeapi, {
        method: 'DELETE',
        body: JSON.stringify({ selected_rows: selectedRows }),
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => response.json().then((data) => ({
        data,
        status: response.status
      })).then((result) => {
        if (result.status === 200) {
          localStorage.setItem('user', JSON.stringify(result.data));
          setServerChange(true);
        } else {
          console.log('Failed to remove the API server because: ', result.data.detail);
        }
      }));
    }
  };

  useEffect(() => {
    const holder = [];
    permissions.forEach((perm) => {
      holder.push({
        servername: perm.human_readable_hostname,
        hostname: perm.hostname,
        token: perm.token,
        permissions: perm.other_info.permissions.groups,
        status: 'Active'
      });
    });
    setRows(holder);
    setServerChange(false);
  }, [serverChange]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        { rows.map((row) => (
          <TableRow key={row.toString()}>
            <TableCell padding="checkbox">
              <Button
                onClick={(e) => deleteServer(e, row.servername)}
              >
                Remove
              </Button>
            </TableCell>
            <TableCell>{row.servername}</TableCell>
            <TableCell>{row.hostname}</TableCell>
            <TableCell>{row.token}</TableCell>
            <TableCell>
              <Card>
                {
                   Object.keys(row.permissions).map((perm, index) => (
                     <Typography key={index.toString} variant="body2" component="p">
                       {perm }
                     </Typography>
                   ))
                }
              </Card>

            </TableCell>
            <TableCell>{row.status}</TableCell>

          </TableRow>
        ))}
        <TableRow>
          <TableCell align="center" colSpan={7}>
            <Button
              color="primary"
              onClick={() => setShowing(true)}
              rows={rows}
              variant="contained"
            >
              Add Server
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

ServerInfo.propTypes = {
  setShowing: PropTypes.func.isRequired,
};

// src/views/account/AccountView/ServerInfo.js

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails, Button, Card, Container, Grid, Table, TableBody, TableCell, Typography, TableHead, TableRow, CardContent
} from '@material-ui/core';
import { FetchContext } from 'src/App';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListBoxStatic from 'src/components/ListBoxStatic';

export default function ServerInfo({ setServer }) {
  const [serverChange, setServerChange] = useState(null);
  const fc = useContext(FetchContext);
  const [rows, setRows] = useState([]);
  //   const [permList, setPermList] = useState([]);
  const permissions = JSON.parse(localStorage.getItem('user')).apiinfo;

  const deleteServer = (event, servername) => {
    const userConfirm = window.confirm('Are you sure you want to delete these rows?');
    const selectedRows = [];
    if (userConfirm) {
    //   localStorage.removeItem('user');
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
          console.log(result.data);
          localStorage.setItem('user', JSON.stringify(result.data));
          setServerChange(true);
        } else {
          console.log('Failed to remove the API server because: ', result.data.detail);
        }
      }));
      window.location.reload(false);
    }
  };

  useEffect(() => {
    const holder = [];
    const permList = [];
    permissions.forEach((perm) => {
      if (perm.other_info.permissions.groups.bco_drafter) {
        const groupHolder = [];
        const userHolder = [];
        Object.keys(perm.other_info.permissions.groups).map((group, index) => (
          groupHolder.push(group)
        ));
        Object.keys(perm.other_info.permissions.user).map((user, index) => (
          Object.keys(user[index]).map((thing, index) => (
            userHolder.push(perm.other_info.permissions.user[user][index])
          ))
        ));
        permList.push({ user: userHolder, groups: groupHolder });
      } else {
        permList.push(perm.other_info.permissions);
      }
      holder.push({
        servername: perm.human_readable_hostname,
        hostname: perm.hostname,
        token: perm.token,
        username: perm.username,
        permissions: permList[permList.length - 1],
        status: 'Active'
      });
    });
    setRows(holder);
    setServerChange(false);
  }, [serverChange]);

  return (
    <div>
      <Container>
        <Button
          color="primary"
          onClick={() => setServer(true)}
          rows={rows}
          variant="contained"
        >
          Add Server
        </Button>
        <Grid container spacing={2}>
          {rows.map((row) => (
            <Grid item xs={12} sm={12} lg={5} xl={5}>
              <Card>
                <CardContent>
                  <div>{row.servername}</div>
                  <div>
                    token:
                    {row.token}
                  </div>
                  <div>
                    hostname:
                    {row.hostname}
                  </div>
                  <div>
                    username:
                    {row.username}
                  </div>
                  <div>
                    status:
                    {row.status}
                  </div>
                  <Button
                    color="red"
                    onClick={(e) => deleteServer(e, row.servername)}
                  >
                    Remove
                  </Button>
                </CardContent>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Groups (click to expand)
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListBoxStatic
                      header="Groups"
                      list={row.permissions.groups}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Permissions (click to expand)
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListBoxStatic
                      header="Permissions"
                      list={row.permissions.user}
                    />
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

ServerInfo.propTypes = {
  setServer: PropTypes.func.isRequired,
};

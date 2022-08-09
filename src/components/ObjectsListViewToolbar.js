// src/components/ObjectsListViewToolbar.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ServerList from 'src/utils/ServerList';
import SearchObjects from 'src/components/API/SearchObjects';

const Toolbar = ({ ApiInfo, setRows }) => {
  const [search, setSearch] = useState('');
  const [action, setAction] = useState();
  const [searchLocation, setSearchLocation] = useState('');
  const userInfo = ApiInfo;

  function clickActions() {
    SearchObjects(action, searchLocation, search, setRows);
  }
  function checkActions(checked) {
    setAction(checked.target.value);
    console.log(checked.target.value);
  }

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box>
                <Typography>
                   1. Select from available BCODBs to display results
                </Typography>
              <ServerList
                options={userInfo === null ? null : userInfo}
                setter={setSearchLocation}
                type="search"
              />
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              2. Use the radio buttons below to select the type of search you would like to perform.
            </Typography>
            <Typography>
              - "My BCOs" will return objects you own.
            </Typography>
            <Typography>
              - "Prefix Search" will return objects with the search term you enter in the prefix.
            </Typography>
            <Typography>
              - "Search BCO_ID" will return objects with the search term you enter in the BCO_ID.
            </Typography>
            <br />
            <Typography>
            <text>
              Search Type:&nbsp;&nbsp;
            </text>
              <input
                type="radio"
                data-limit="only-one-in-a-group"
                name="radio"
                value="mine"
                onChange={checkActions}
                disabled={searchLocation === ''}
              />
                &nbsp;&nbsp;My BCOs&nbsp;&nbsp;
              <input
                type="radio"
                data-limit="only-one-in-a-group"
                name="radio"
                value="prefix"
                onChange={checkActions}
                disabled={searchLocation === ''}
              />
                &nbsp;&nbsp;Prefix Search&nbsp;&nbsp;
              <input
                type="radio"
                data-limit="only-one-in-a-group"
                name="radio"
                value="bco_id"
                onChange={checkActions}
                disabled={searchLocation === ''}
              />
              &nbsp;&nbsp;Search BCO_ID&nbsp;&nbsp;
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <Typography>
                3. Enter search term below
              </Typography>
              <br />
              <TextField
                fullWidth
                disabled={searchLocation === '' || action === 'mine'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search BCODB"
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                disabled={!action}
                color="primary"
                variant="contained"
                onClick={() => clickActions()}
              >
                Search
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  ApiInfo: PropTypes.array.isRequired,
  setRows: PropTypes.func
};

export default Toolbar;

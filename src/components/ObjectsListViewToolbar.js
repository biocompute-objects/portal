// src/views/objects/ObjectsListView/Toolbar.js

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
            <text>
              Search Type:&nbsp;&nbsp;
            </text>
            <Typography>
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

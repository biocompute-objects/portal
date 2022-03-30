// src/views/objects/ObjectsListView/Toolbar.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ServerList from 'src/utils/ServerList';
import SearchObjects from 'src/components/API/SearchObjects';

const Toolbar = ({ ApiInfo, rows, setRows }) => {
  const [search, setSearch] = useState('');
  const [prefix, setPrefix] = useState();
  const [searchLocation, setSearchLocation] = useState('');
  const userInfo = ApiInfo;

  function clickActions(action) {
    SearchObjects(action, searchLocation, search, setRows);
  }
  useEffect(() => {
    if (searchLocation !== '' && search.length > 2 && search.length < 6) {
      console.log('prefix', prefix);
      setPrefix(true);
    } else {
      setPrefix(false);
    }
  }, [search, searchLocation]);
  return (
    <div>
      <Box display="flex" justifyContent="flex-end" />
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
            <Box maxWidth={500}>
              <TextField
                fullWidth
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
            </Box>
            <Button
              disabled={prefix !== true}
              color="primary"
              variant="contained"
              onClick={() => clickActions('prefix')}
            >
              Search prefix
            </Button>
            <Button
              disabled={searchLocation === ''}
              color="primary"
              variant="contained"
              onClick={() => clickActions('bco_id')}
            >
              Seach BCO_ID
            </Button>
            <Button
              disabled={searchLocation === ''}
              color="primary"
              variant="contained"
              onClick={() => clickActions('mine')}
            >
              My BCOs
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  ApiInfo: PropTypes.array.isRequired,
  rows: PropTypes.array,
  setRows: PropTypes.func
};

export default Toolbar;

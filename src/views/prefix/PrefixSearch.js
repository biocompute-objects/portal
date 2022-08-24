// src/components/PrefixSearch.js

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
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import SearchPrefix from 'src/components/API/UserdbSearchPrefix';

export default function PrefixSearch({
  setRows, setAddPrefix, fc
}) {
  const [search, setSearch] = useState('');
  const [action, setAction] = useState();
  const { isLoggedIn } = fc;
  function clickActions() {
    const { userdb } = fc.sending;
    SearchPrefix(action, search, userdb, setRows, isLoggedIn);
  }

  function checkActions(checked) {
    setAction(checked.target.value);
  }

  const registerPrefix = () => {
    setAddPrefix(true);
  };

  function clear() {
    setSearch(null);
    setAction(null);
    setRows([]);
  }

  useEffect(() => {
    if (action !== 'search') {
      setSearch(null);
    }
  }, [action]);

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box justifyContent="flex">
              <div>
                Search Type:&nbsp;&nbsp;
              </div>
              <Typography>
                <input
                  type="radio"
                  data-limit="only-one-in-a-group"
                  name="radio"
                  value="mine"
                  onChange={checkActions}
                  disabled={!isLoggedIn}
                />
                &nbsp;&nbsp;My Prefixes&nbsp;&nbsp;
                <input
                  type="radio"
                  data-limit="only-one-in-a-group"
                  name="radio"
                  value="all"
                  onChange={checkActions}
                />
                &nbsp;&nbsp;Return all&nbsp;&nbsp;
                <input
                  type="radio"
                  data-limit="only-one-in-a-group"
                  name="radio"
                  value="search"
                  onChange={checkActions}
                />
                &nbsp;&nbsp;Search&nbsp;&nbsp;
                &nbsp;&nbsp;
                <Button
                  disabled={!action}
                  color="primary"
                  variant="contained"
                  onClick={() => clickActions()}
                >
                  Search
                </Button>
                &nbsp;&nbsp;
                <Button
                  disabled={!action}
                  color="primary"
                  variant="contained"
                  onClick={() => clear()}
                >
                  Clear Search
                </Button>
              </Typography>
              <br />
              {
                (action !== 'search')
                  ? (<div />)
                  : (
                    <TextField
                      disabled={action !== 'search'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon fontSize="small" color="action">
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search BCO Prefix DB"
                      onChange={(e) => setSearch(e.target.value)}
                      variant="outlined"
                    />
                  )
              }
              <Typography>
                Please contact the prefix owner if you would like access to that prefix.
                <br />
              </Typography>
              <br />
              <Button
                onClick={registerPrefix}
                disabled={!isLoggedIn}
                color="primary"
                variant="contained"
              >
                Register Prefix
                {' '}

              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

PrefixSearch.propTypes = {
  setRows: PropTypes.func.isRequired,
  setAddPrefix: PropTypes.func,
  fc: PropTypes.any
};

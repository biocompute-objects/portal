// src/components/PrefixSearch.js

import React, { useContext, useEffect, useState } from 'react';
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
import { FetchContext } from 'src/App';

export default function PrefixSearch({ setRows }) {
  const [search, setSearch] = useState('');
  const [action, setAction] = useState();
  const fc = useContext(FetchContext);

  function clickActions() {
    const ApiInfo = fc.sending.userdb;
    SearchPrefix(action, search, ApiInfo, setRows);
  }

  function checkActions(checked) {
    setAction(checked.target.value);
  }

  function clear() {
    setSearch(null);
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
                />
                &nbsp;&nbsp;My Prefixs&nbsp;&nbsp;
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
                Please contact the prefix owner if you need access to that prefix.
                <br />
                If you would like to register a prefix please contact
                {' '}
                <a href="mailto:keeneyjg@gwu.edu">keeneyjg@gwu.edu</a>
              </Typography>
              <br />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

PrefixSearch.propTypes = {
  setRows: PropTypes.func.isRequired
};

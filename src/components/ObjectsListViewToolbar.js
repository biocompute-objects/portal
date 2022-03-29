// src/views/objects/ObjectsListView/Toolbar.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [searchLocation, setSearchLocation] = useState();
  const userInfo = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
      console.log('searchLocation', searchLocation);
  }, [searchLocation])
  
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box display="flex" justifyContent="flex-end" />
      <Box mt={3}>
        <Card>
          <CardContent>
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
              />
              <Box>
                <ServerList
                  options={userInfo === null ? null : userInfo.apiinfo}
                  setter={setSearchLocation}
                  type="search"
                />
              </Box>
            </Box>
            <Button className={classes.importButton} color="primary" variant="contained">
              Search prefix
            </Button>
            <Button className={classes.exportButton} color="primary" variant="contained">
              Seach BCO_ID
            </Button>
            <Button color="primary" variant="contained">
              My BCOs
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

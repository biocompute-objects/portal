// src/views/home/HomeView/ListBoxStatic.js

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  makeStyles,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import { Textfit } from 'react-textfit';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  box: {
    height: 150,
    overflow: 'auto',
  },
  linkCard: {
    minWidth: 275,
    textAlign: 'left',
  },
  title: {
    fontSize: '23px',
  },
  pos: {
    marginBottom: 12,
  },
});

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

export default function ListBoxStatic({
  header, list, bool, setBool, url, setUrl, token, setSubmitToken
}) {
  const classes = useStyles();

  return (
    <Card className={classes.linkCard}>
      <CardContent className={classes.box}>
        {
            Object.keys(list).map((item, index) => (
              <div>
                <Button
                  key={index.toString}
                  variant="contained"
                  color="secondary"
                  disableElevation
                >
                  {list[index] }
                </Button>

              </div>
            ))
        }

      </CardContent>
      <CardContent>
        <Button
          onClick={() => {
            setBool(true);
            setUrl(url);
            setSubmitToken(token);
          }}
        >
          New
          {' '}
          {header}
        </Button>
      </CardContent>
    </Card>
  );
}

ListBoxStatic.propTypes = {
  list: PropTypes.array,
  header: PropTypes.string,
  bool: PropTypes.bool,
  setBool: PropTypes.func,
  url: PropTypes.string,
  setUrl: PropTypes.func,
  setSubmitToken: PropTypes.func,
  token: PropTypes.string
};

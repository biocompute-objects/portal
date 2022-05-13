// src/views/home/HomeView/GroupsAndPerms.js

import React from 'react';
import {
  Card,
  CardContent,
  Button,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ApiGroupInfo from 'src/components/API/ApiGroupInfo';

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

export default function GroupsAndPerms({
  header, list, setAdd, url, setUrl, token, setSubmitToken, setModifyGroup, setGroupInfo
}) {
  const classes = useStyles();

  const modify = (group) => {
    console.log('test', group, token);
    ApiGroupInfo(group, token, url, setGroupInfo);
    setModifyGroup(true);
    setUrl(url);
    setSubmitToken(token);
  };

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
                  onClick={() => modify(list[index])}
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
            setAdd(true);
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

GroupsAndPerms.propTypes = {
  list: PropTypes.array,
  header: PropTypes.string,
  setAdd: PropTypes.func,
  url: PropTypes.string,
  setUrl: PropTypes.func,
  setSubmitToken: PropTypes.func,
  setModifyGroup: PropTypes.func,
  token: PropTypes.string,
  setGroupInfo: PropTypes.func
};

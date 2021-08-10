import React from 'react';
import {
  makeStyles
} from '@material-ui/core';

// Rendering dynamic JSON.
import RecursiveComponent from 'react-json-component';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Tree = ({ contents }) => {

  return (
    <RecursiveComponent 
      property={contents}
      propertyName="Object Information"
      excludeBottomBorder={false}
      rootProperty={true}
    />
  );
};

export default Tree;

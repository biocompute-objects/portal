import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Styling
// Source: https://stackoverflow.com/questions/43975839/material-ui-next-styling-text-inside-listitemtext

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  emphasized: {
    fontWeight: 'bold',
    fontSize: '21px'
  },
  navHeader: {
    textAlign: 'center'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function FeaturedBcos() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.navHeader}>
          <ListItemText classes={{ primary: classes.emphasized }} primary="Featured BCO Collections" />
        <ListItemLink href="https://www.github.com/" target="_blank">
          <ListItemText primary="BioMarker Set 1" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="BioMarker Set 2" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="BioMarker Set 2" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="BioMarker Set 2" />
        </ListItemLink>
        <ListItemText classes={{ primary: classes.emphasized }} primary="BCO Projects" />
        <ListItemLink href="https://github.com/biocompute-objects" target="_blank">
          <ListItemText primary="BCO on GitHub" />
        </ListItemLink>
        <ListItemLink href="https://www.github.com/" target="_blank">
          <ListItemText primary="CWL and BCO" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="HIVE" />
        </ListItemLink>
      </List>
    </div>
  );
}

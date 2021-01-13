import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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

export default function ObjectOptions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.navHeader}>
          <ListItemText classes={{ primary: classes.emphasized }} primary="Object Options" />
        <ListItemLink href="https://www.github.com/" target="_blank">
          <ListItemText primary="eMail object" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
        <ListItemText primary="Show derived from chain" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Download Object" />
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

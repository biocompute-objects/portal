// src/views/account/AccountView/ModifyGroup.js

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ApiModifyGroup from 'src/components/API/ApiModifyGroup';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

// Fetch context.
import ListBox from 'src/components/ListBox';

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center'
  }
}));

export default function ModifyGroup({
  modifyGroup, setModifyGroup, url, submitToken, groupInfo
}) {
  const classes = useStyles();
  const [groupName, setGroupName] = useState('');
  const [groupUsers, setGroupUsers] = useState();
  const [description, setDescription] = useState('');
  const [rerender, setRerender] = useState(0);

  const [rename, setRename] = useState(false);
  const [redescribe, setRediscribe] = useState(false);
  const [modifyMembers, setModifyMembers] = useState(false);
  const [changeOwner, setChangeOwner] = useState(false);
  const handleClose = () => {
    setGroupName('');
    setGroupUsers([]);
    setModifyMembers(false);
    setDescription('');
    setModifyGroup(false);
  };

  const submitModifyGroup = () => {
    const removeUsers = [];
    const addUsers = [];
    groupUsers.forEach((member) => {
      console.log('member 51', member);
      if (groupInfo.members.indexOf(member) > -1 === false) {
        addUsers.push(member);
      }
    });
    groupInfo.members.forEach((member) => {
      if (!(groupUsers.indexOf(member) > -1)) {
        removeUsers.push(member);
      }
    });
    console.log(removeUsers, addUsers);
    ApiModifyGroup(groupInfo, groupName, addUsers, removeUsers, description, url, submitToken);
    console.log(url);
    handleClose();
  };

  function checkActions(event) {
    if (event.target.id === 'rename') {
      setRename(event.target.checked);
    }
    if (event.target.id === 'redescribe') {
      setRediscribe(event.target.checked);
    }
    if (event.target.id === 'modify-users') {
      setModifyMembers(event.target.checked);
    }
    if (event.target.id === 'change-owner') {
      setChangeOwner(event.target.checked);
    }
    console.log(event.target.id);
  }

  useEffect(() => {
    const membersCopy = [...groupInfo.members];
    setGroupName(groupInfo.name);
    setDescription(groupInfo.description);
    setGroupUsers(membersCopy);
    console.log('useEffect', membersCopy);
  }, [groupInfo]);

  return (
    <div>
      <Dialog open={modifyGroup} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="Modify Group">
          <Typography>
            Group Information
          </Typography>
        </DialogTitle>
        <DialogContent>
          { (groupInfo.admin === true)
            ? (
              <DialogContentText>
                <Typography>
                  <b>Actions</b>
                </Typography>
                <Typography>
                  Check the box for each type of action you want to complete
                </Typography>
                <Typography><br /></Typography>
                <Typography>
                  <input
                    id="rename"
                    type="checkbox"
                    checked={rename}
                    onChange={checkActions}
                    disabled
                  />
              &nbsp;&nbsp;Rename&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    id="redescribe"
                    checked={redescribe}
                    onChange={checkActions}
                  />
              &nbsp;&nbsp;Edit description&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    id="modify-users"
                    checked={modifyMembers}
                    onChange={checkActions}
                  />
              &nbsp;&nbsp;Modify Users
                </Typography>
                {/* <Typography>
                  &nbsp;&nbsp;
                  <input
                    type="checkbox"
                    id="change-owner"
                    checked={changeOwner}
                    onChange={checkActions}
                  />
              &nbsp;&nbsp;Change Group Owner&nbsp;&nbsp;
                </Typography> */}
                  <br />
              </DialogContentText>
            )
            : (
              <></>
            )}
          <TextField
            autoFocus
            margin="dense"
            id="groupName"
            label="Group Name"
            fullWidth
            disabled={rename === false}
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Group Description"
            fullWidth
            disabled={redescribe === false}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <br />
          {
            // eslint-disable-next-line no-nested-ternary
            (modifyMembers === true)
              ? (
                <DialogContentText>
                  <ListBox
                    link="noLink"
                    list={groupUsers}
                    setList={setGroupUsers}
                    setRerender={setRerender}
                    rerender={rerender}
                  />
                  <Typography>
                    Enter each username you want to be included in this group
                    in the box aboove and then and hit the &apos;+&apos;
                  </Typography>
                </DialogContentText>
              )
              : (<></>)
          }
          <div className={classes.centered}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            &nbsp;
            <Button
              disabled={!(groupName.length > 2) || modifyMembers === false || setRediscribe === false}
              color="primary"
              onClick={submitModifyGroup}
              variant="contained"
            >
              Submit Group Modifications
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ModifyGroup.propTypes = {
  setModifyGroup: PropTypes.func.isRequired,
  modifyGroup: PropTypes.bool.isRequired,
  url: PropTypes.string,
  submitToken: PropTypes.string,
  groupInfo: PropTypes.object
};

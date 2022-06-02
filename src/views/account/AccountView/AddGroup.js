import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateTimePicker from 'react-datetime-picker';
import ApiNewGroup from 'src/components/API/ApiNewGroup';
import {
  Checkbox,
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

export default function AddGroup({
  addGroup, setAddGroup, url, submitToken
}) {
  const classes = useStyles();
  const [groupName, setGroupName] = useState('');
  const [groupUsers, setGroupUsers] = useState([]);
  const [deleteMembers, setDeleteMembers] = useState(false);
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState(null);
  const [maxMembers, setMaxMemers] = useState(0);
  const [rerender, setRerender] = useState(0);

  // TODO: improve error checking.

  const handleDelete = (event) => {
    setDeleteMembers(event.target.checked);
  };

  const handleClose = () => {
    setGroupName('');
    setGroupUsers([]);
    setDeleteMembers(false);
    setDescription('');
    setExpiration('');
    setMaxMemers(0); // TODO: move later to be more "graceful" on close...
    setAddGroup(false);
  };

  const submitNewGroup = () => {
    ApiNewGroup(
      groupName, groupUsers, deleteMembers, description, expiration, maxMembers, url, submitToken
    );
    console.log(url);
    handleClose();
  };

  console.log('Test', submitToken, groupName, groupUsers, deleteMembers, description, expiration, maxMembers);

  return (
    <div>
      <Dialog open={addGroup} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="Create new group">
          <Typography>
            Create a new group on $Server
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Enter the hostname below and click &#34;Request group Information&#34;
              to confirm that you are adding the correct addGroup.
            </Typography>
            <Typography>
              <br />
            </Typography>
            <Typography>
              The returned addGroup information is based on the token you provide.
              You must have already received a token from this addGroup.
            </Typography>
            <Typography>
              <br />
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="groupName"
            label="Group Name"
            fullWidth
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <DialogContentText>
            <Typography>
              Enter each username you want to be included in this group
              in the box below and then and hit the &apos;+&apos;
            </Typography>
          </DialogContentText>
          <ListBox
            link="noLink"
            list={groupUsers}
            setList={setGroupUsers}
            setRerender={setRerender}
            rerender={rerender}
          />
          {/* <DialogContentText>
            <Typography>
              Delete members on group deletion
              <Checkbox
                size="large"
                checked={deleteMembers}
                onChange={handleDelete}
              />
            </Typography>

            <Typography>
              Set a max number of members?
              <input
                type="text"
                pattern="[0-9]*\.?[0-9]*"
                value={maxMembers}
                onChange={(e) =>
                  setMaxMemers((v) => (e.target.validity.valid ? e.target.value : v))}
              />
            </Typography>
          </DialogContentText> */}
          {/* <DateTimePicker
            onChange={setExpiration}
            value={expiration}
          /> */}
          {/* <ServerStatus serverStatus={requestStatus} /> */}
          <div className={classes.centered}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            &nbsp;
            <Button
              disabled={!(groupName.length > 2)}
              color="primary"
              onClick={submitNewGroup}
              variant="contained"
            >
              Create New Group
            </Button>
          </div>
        </DialogContent>
        {/* <DialogActions>

          <Button
            disabled={!(Object.keys(serverInfo).length > 0)}
            onClick={addGroupInfoToUserDb}
            color="primary"
          >
            Add addGroup
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

AddGroup.propTypes = {
  setAddGroup: PropTypes.func.isRequired,
  addGroup: PropTypes.bool.isRequired,
  url: PropTypes.string,
  submitToken: PropTypes.string
};

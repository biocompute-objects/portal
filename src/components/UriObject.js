/* eslint-disable no-nested-ternary */
// src/components/ListBoxMulti.js

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  makeStyles,
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
  linkCard: {
    minWidth: 275,
    textAlign: 'left'
  },
  title: {
    fontSize: '33px',
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

export default function UriObject({
  link, header, list, setList, setRerender, rerender, additionalField
}) {
  const classes = useStyles();
  const [newFile, setNewFile] = useState('');
  const [newUri, setNewUri] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newChecksum, setNewChecksum] = useState('');
  const [newField, setNewField] = useState('');

  useEffect(() => {
    if (typeof list === 'undefined') {
      setList([]);
      console.log('list 61', list);
    }
  }, [list, setList]);

  const removeItem = (index) => {
    const temp = list;
    temp.splice(index, 1);
    setList(temp);
    setNewField('');
    setNewFile('');
    setNewField('');
    setNewTime('');
    setNewChecksum('');
    setRerender(rerender + 1);
  };

  const addItem = () => {
    const temp = {
      uri: {
        filename: newFile,
        uri: newUri,
        access_time: newTime,
        sha1_checksum: newChecksum
      }
    };
    if (newField !== ('')) {
      temp[additionalField] = newField;
    }
    list.push(temp);
    setNewField('');
    setNewFile('');
    setNewUri('');
    setNewTime('');
    setNewChecksum('');
    setRerender(rerender + 1);
  };

  return (
    <Card className={classes.linkCard}>
      <CardActionArea onClick={() => window.open(link)}>
        <CardContent className={classes.linkCard}>
          <Typography className={classes.title}>
            {header}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        {
            (!additionalField)
              ? (
                <TableRow>
                  <StyledCell />
                  <StyledCell>
                    <Typography>Filename</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>URI</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>Access Time</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>SHA1 Checksum</Typography>
                  </StyledCell>
                </TableRow>
              )
              : (
                <TableRow>
                  <StyledCell />
                  <StyledCell>
                    <Typography>{additionalField}</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>Filename</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>URI</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>Access Time</Typography>
                  </StyledCell>
                  <StyledCell>
                    <Typography>SHA1 Checksum</Typography>
                  </StyledCell>
                </TableRow>
              )

        }
        {
           (!list)
             ? (<TableRow />)
             : (!additionalField)
               ? ((list.map((item, key) => (
                 <TableRow>
                   <StyledCell>
                     <Button
                       variant="contained"
                       color="primary"
                       disableElevation
                       onClick={() => removeItem(key)}
                     >
                       Remove
                     </Button>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.filename}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.uri}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.access_time}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.sha1_checksum}
                     </Textfit>
                   </StyledCell>
                 </TableRow>
               ))
               ))
               : ((list.map((item, key) => (
                 <TableRow>
                   <StyledCell>
                     <Button
                       variant="contained"
                       color="primary"
                       disableElevation
                       onClick={() => removeItem(key)}
                     >
                       Remove
                     </Button>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item[additionalField]}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.filename}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.uri}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.access_time}
                     </Textfit>
                   </StyledCell>
                   <StyledCell>
                     <Textfit mode="multi" max={16}>
                       {item.uri.sha1_checksum}
                     </Textfit>
                   </StyledCell>
                 </TableRow>
               ))

               ))
        }
        {
            (!additionalField)
              ? (
                <TableRow>
                  <StyledCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      onClick={addItem}
                    >
                      Add
                    </Button>
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewFile(e.target.value)}
                      value={newFile}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewUri(e.target.value)}
                      value={newUri}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewTime(e.target.value)}
                      value={newTime}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewChecksum(e.target.value)}
                      value={newChecksum}
                    />
                  </StyledCell>

                </TableRow>
              )

              : (
                <TableRow>
                  <StyledCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      fullWidth
                      onClick={addItem}
                    >
                      Add
                    </Button>
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewField(e.target.value)}
                      value={newField}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewFile(e.target.value)}
                      value={newFile}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewUri(e.target.value)}
                      value={newUri}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewTime(e.target.value)}
                      value={newTime}
                    />
                  </StyledCell>
                  <StyledCell>
                    <TextField
                      InputProps={{ className: classes.root }}
                      color="primary"
                      fullWidth
                      id="outlined-multiline-static"
                      variant="outlined"
                      onChange={(e) => setNewChecksum(e.target.value)}
                      value={newChecksum}
                    />
                  </StyledCell>
                </TableRow>
              )
        }
      </CardContent>
    </Card>
  );
}

UriObject.propTypes = {
  link: PropTypes.string.isRequired,
  header: PropTypes.string,
  list: PropTypes.array,
  setList: PropTypes.func,
  setRerender: PropTypes.func,
  rerender: PropTypes.number,
  additionalField: PropTypes.array.isRequired,
};

// src/components/PrefixResults.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

export default function PrefixResults({ rows, userInfo }) {
  const prefixLink = '/account';
  const [username, setUsername] = useState();

  useEffect(() => {
    if (!userInfo) {
      setUsername('anon');
    } else {
      setUsername(userInfo.username);
    }
  }, []);

  return (
    <Container>
      {rows.length === 0
        ? (
          <Card>
            <CardContent>
              <Typography>
                No results for that search
              </Typography>
            </CardContent>
          </Card>
        )
        : (
          <Grid container spacing={2}>
            {rows.map((row) => (
              <Card key={row.prefix}>
                <CardContent>
                  <CardActionArea
                    onClick={() => window.open(prefixLink)}
                    disabled={username !== row.username}
                  >
                    <Typography>
                      Prefix:
                      {' '}
                      {row.prefix}
                    </Typography>
                    <Typography>
                      Prefix owner:
                      {' '}
                      {row.username}
                    </Typography>
                    <Typography>
                      Registration date:
                      {' '}
                      {row.registration_date}
                    </Typography>
                  </CardActionArea>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
    </Container>

  );
}

PrefixResults.propTypes = {
  rows: PropTypes.array,
  userInfo: PropTypes.object
};

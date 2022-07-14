// src/components/PrefixResults.js

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

export default function PrefixResults({ rows }) {
  console.log('contents', rows.length);
  return (
    <Container>
      <Grid container spacing={2}>
        {rows.map((row) => (
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>

  );
}

PrefixResults.propTypes = {
  rows: PropTypes.array
};

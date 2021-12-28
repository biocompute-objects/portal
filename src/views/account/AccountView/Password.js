// src/views/account/AccountView/Password.js

import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FetchContext } from 'src/App';
import UserdbChangePassword from 'src/components/API/UserdbChangePassword';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const fc = useContext(FetchContext);
  return (
    <Formik
      initialValues={{
        old_password: '',
        new_password: '',
        confirm_password: '',
        userdb: fc.sending.userdb,
      }}
      validationSchema={Yup.object().shape({
        new_password: Yup.string()
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/(?=.*[0-9])/, 'Password must contain a number.')
          .max(255)
          .required('Password is required'),
        confirm_password: Yup.string()
          .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
          .required('Password Conformation is required'),

      })}
      onSubmit={(values) => {
      // Determine whether or not our login was legitimate.
        console.log('values', values);
        UserdbChangePassword(values);
      }}
    >
      {({
        errors, handleBlur, handleChange, handleSubmit, touched, values
      }) => (
        <form onSubmit={handleSubmit} className={clsx(classes.root, className)}>
          <Card elevation={0}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} xs={6}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Old Password"
                    margin="normal"
                    name="old_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.old_password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <TextField
                    error={Boolean(touched.new_password && errors.new_password)}
                    fullWidth
                    helperText={touched.new_password && errors.new_password}
                    label="New Password"
                    margin="normal"
                    name="new_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.new_password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <TextField
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    fullWidth
                    helperText={touched.confirm_password && errors.confirm_password}
                    label="Confirm New Password"
                    margin="normal"
                    name="confirm_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirm_password}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Box display="flex" justifyContent="center" p={2}>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;

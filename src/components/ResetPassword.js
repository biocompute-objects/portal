// src/views/auth/ResetPassword.js

import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import UserdbPasswordReset from 'src/components/API/UserdbPasswordReset';
import UserdbConfirmPasswordReset from 'src/components/API/UserdbConfirmPasswordReset';
import { FetchContext } from 'src/App';

const useStyles = makeStyles((theme) => ({
  alertSpec: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ResetPassword = () => {
  const [alternateView, setAlternateView] = useState(false);
  const classes = useStyles();
  const fc = useContext(FetchContext);
  console.log('fc', fc.sending.userdb);
  return (
    <Page className={classes.root} title="Rest Password">
      {(alternateView === true)
        ? (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <Formik
                initialValues={{
                  password: '',
                  confirmPassword: '',
                  token: '',
                  userdb: fc.sending.userdb,
                }}
                validationSchema={Yup.object().shape({
                  password: Yup.string()
                    .min(8, 'Password is too short - should be 8 chars minimum.')
                    .matches(/(?=.*[0-9])/, 'Password must contain a number.')
                    .max(255)
                    .required('Password is required'),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')

                })}
                onSubmit={(values) => {
                  // Determine whether or not our login was legitimate.
                  console.log('values', values);
                  UserdbConfirmPasswordReset(values);
                }}
              >
                {({
                  errors, handleBlur, handleChange, handleSubmit, touched, values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Create New Password
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Enter the token you recieved in your email, and your new password.
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.token && errors.token)}
                      fullWidth
                      helperText={touched.token && errors.token}
                      label="Password Reset Token"
                      margin="normal"
                      name="token"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="token"
                      value={values.token}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="New Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      fullWidth
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      label="Confirm Password"
                      margin="normal"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.confirmPassword}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                        Submit
                      </Button>
                    </Box>
                    <Typography color="textSecondary" variant="body1">
                      Don&apos;t have an account?
                      {' '}
                      <Link component={RouterLink} to="/register" variant="h6">
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        )
        : (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <Formik
                initialValues={{
                  email: '',
                  userdb: fc.sending.userdb,
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().max(255).required('Email is required')
                })}
                onSubmit={(values) => {
                  // Determine whether or not our login was legitimate.
                  console.log('values', values);
                  UserdbPasswordReset(values, setAlternateView, alternateView);
                }}
              >
                {({
                  errors, handleBlur, handleChange, handleSubmit, touched, values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Reset Password
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Enter your email address. If there is an account associated with that address
                        we will provide you a link to reset your password
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                        Submit
                      </Button>
                    </Box>
                    <Typography color="textSecondary" variant="body1">
                      Don&apos;t have an account?
                      {' '}
                      <Link component={RouterLink} to="/register" variant="h6">
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        )}
    </Page>
  );
};

export default ResetPassword;

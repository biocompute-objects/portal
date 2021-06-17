// src/views/auth/LoginView.js

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

// Fetch context.
import { FetchContext } from '../../App';

// Registration error
// Source: https://material-ui.com/components/alert/#simple-alerts
import Alert from '@material-ui/lab/Alert';

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

const LoginView = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  // Fetch context.
  const fc = useContext(FetchContext);

  // State
  const [loginError, setLoginError] = useState(false);

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('User Name is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              
              // Determine whether or not our login was legitimate.
              fetch(fc['sending']['userdb_tokenauth'], {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "username": values.username, 
                  "password": values.password
                })
              })
              .then(res => res.json()).then(json => {
                  if(typeof(json.user) !== 'undefined') {
                    
                    // Set the user information.
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('user', JSON.stringify(json.user));

                    navigate('/dashboard', { replace: true });

                  } else {
                    
                    // Bad login.
                    setLoginError(true);

                  }
                })
              }
            }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in using your Portal credentials.
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                  </Grid>
                </Grid>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <div className={classes.alertSpec}>
                    {loginError && <Alert severity = "error">Incorrect username or password!</Alert>}
                  </div>
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
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

const RegisterView = () => {
  
  const classes = useStyles();
  
  // Fetch context.
  const fc = useContext(FetchContext);

  // State
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [responseToken, setResponseToken] = useState('');

  // Re-direct upon successful creation.
  // const navigate = useNavigate();

  // For getting Formik values.
  // Source: https://stackoverflow.com/a/60535658
  const formRef = useRef();
  
  useEffect(() => {
    
    // Re-direct to the home page.
    if(registrationSuccess === true) {

      // No more error message.
      setRegistrationError(false);

      // Wait a couple seconds.
      // Source: https://reactgo.com/settimeout-in-react-hooks/
      // setTimeout(() => {
      //   navigate('/login', { replace: true });
      // }, 3000);
      
      // Send a request to the default local server to create
      // an account with the given email.

      // The request is based upon whether or not we're asking
      // the API to write back to userdb.

      // TODO: put in logic for somewhere in App.js?

      fetch(fc['sending']['bcoapi_accounts_new'], {
        method: 'POST',
        body: JSON.stringify({
            email: formRef['current']['values']['email'],
            token: responseToken
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }).then(response=>response.json()).then(data=>{
        
          console.log(data);
          
        })

    }

  }, [registrationSuccess])

  // Proper way to do a fetch.
  // Source: https://stackoverflow.com/a/37555432

  return (
    <Page
      className={classes.root}
      title="Register"
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
        password: '',
        firstName: '',
        lastName: '',
        email: ''
      }}
      innerRef={formRef}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(6, 'User name is too short - must contain 6 chars minimum')
          .max(255)
          .required('User Name is required'),
        password: Yup.string()
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number.")
          .max(255).required('Password is required')
      })}
      onSubmit={(values) => {
        
        fetch(fc['sending']['userdb_users'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            "username": values.username, 
            "password": values.password,
            "firstname": values.firstName, 
            "lastname": values.lastName,
            "email": values.email
          })
            }).then(res => res.json().then(data => ({
              data: data,
              status: res.status
            })).then(res => {
              
              // Did the request go ok or not?
              if(res.status === 409) {

                // Show the error message.
                setRegistrationError(true);
              
              } else if(res.status === 201) {

                // Set the state variable to the response token.
                setResponseToken(res.data.token)

                // Show the success message for a couple of seconds.
                setRegistrationSuccess(true);

              }

            }))
          }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create a new Portal account
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography> */}
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="username"
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
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  {/* <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography> */}
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <div className={classes.alertSpec}>
                    {
                      registrationSuccess && <Alert severity = "success">Please check your e-mail within the next 10 minutes in order to activate your account.</Alert>
                    }
                  </div>
                  <div className={classes.alertSpec}>
                    {
                      registrationError && <Alert severity = "error">An account with this username already exists.</Alert>
                    }
                  </div>
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={registrationSuccess}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up for Portal account
                  </Button>
                </Box>
                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography> */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;

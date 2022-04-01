import React, { useContext, useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';
import { FetchContext } from 'src/App';
import UserdbNewAccount from 'src/components/API/UserdbNewAccount';
import ApiNewAccount from 'src/components/API/ApiNewAccount';

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
  const navigate = useNavigate();

  // Fetch context.
  const fc = useContext(FetchContext);

  // Re-direct upon successful creation.
  // const navigate = useNavigate();

  // For getting Formik values.
  // Source: https://stackoverflow.com/a/60535658
  const formRef = useRef();

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
        height="flex"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: '',
              email: '',
              apiurl: fc.sending.bcoapi_accounts_new,
              userurl: fc.sending.userdb_users,
            }}
            innerRef={formRef}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required('eMail is required to register'),
              username: Yup.string()
                .min(6, 'User name is too short - must contain 6 chars minimum')
                .max(255)
                .required('User Name is required'),
              password: Yup.string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/(?=.*[0-9])/, 'Password must contain a number.')
                .max(255)
                .required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')

            })}
            onSubmit={(values) => {
              // NOTE: This will set the Token generated in local storage
              //        maybe should return here too
              UserdbNewAccount(values).then(response => {
                if (localStorage.getItem('tokenAPI')) {
                  console.log('getting API account now');
                  ApiNewAccount(values).then(response => {
                    navigate('/login', { replace: true });
                  });
                }
              });
            }}
          >
            {({
              errors, handleBlur, handleChange, handleSubmit, touched, values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create a new Portal account
                  </Typography>
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
                  <Button
                    color="primary"
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

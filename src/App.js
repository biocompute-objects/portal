// src/App.js

import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { createContext, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import TokenVerify from './components/API/TokenVerify';

/**
 * Create a context to pass the fetch variables.
 *
 * @component
 */
export const FetchContext = createContext();

function App() {
  const routing = useRoutes(routes());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /*
  * Define hostnames here.
  */
  // TODO: This is assuming a host at 8000 and 8080 - should probably be set more dynamically
  const hostnames = {
    local: {
      userdb: 'http://127.0.0.1:8080/users/',
      bcoapi: 'http://127.0.0.1:8000/api/',
      bcoapi_accounts_new: 'http://127.0.0.1:8000/api/accounts/new/',
      bcoapi_description_permissions: 'http://127.0.0.1:8000/api/description/permissions/',
      bcoapi_objects_create: 'http://127.0.0.1:8000/api/objects/create/',
      bcoapi_objects_list: 'http://127.0.0.1:8000/api/objects/token/',
      bcoapi_objects_read: 'http://127.0.0.1:8000/api/objects/read/',
      bcoapi_objects_view: 'http://127.0.0.1:8000/api/objects/view/',
      userdb_addapi: 'http://127.0.0.1:8080/users/add_api/',
      userdb_removeapi: 'http://127.0.0.1:8080/users/remove_api/',
      userdb_users: 'http://127.0.0.1:8080/users/list/',
      update_user: 'http://127.0.0.1:8080/users/update_user/',
      userdb_tokenauth: 'http://127.0.0.1:8080/users/token-auth/',
      userdb_tokenverify: 'http://127.0.0.1:8080/users/token-verify/',
      anon_api_info: [
        {
          token: '627626823549f787c3ec763ff687169206626149',
          public_hostname: 'http://127.0.0.1:8000'
        }
      ]
    },
    test: {
      userdb: 'https://test.portal.biochemistry.gwu.edu/users/',
      bcoapi: 'https://test.portal.biochemistry.gwu.edu/api/',
      bcoapi_accounts_new: 'https://test.portal.biochemistry.gwu.edu/api/accounts/new/',
      bcoapi_description_permissions: 'https://test.portal.biochemistry.gwu.edu/api/description/permissions/',
      bcoapi_objects_create: 'https://test.portal.biochemistry.gwu.edu/api/objects/create/',
      bcoapi_objects_list: 'https://test.portal.biochemistry.gwu.edu/api/objects/token/',
      bcoapi_objects_read: 'https://test.portal.biochemistry.gwu.edu/api/objects/read/',
      bcoapi_objects_view: 'https://test.portal.biochemistry.gwu.edu/api/objects/view/',
      userdb_addapi: 'https://test.portal.biochemistry.gwu.edu/users/add_api/',
      userdb_removeapi: 'https://test.portal.biochemistry.gwu.edu/users/remove_api/',
      userdb_users: 'https://test.portal.biochemistry.gwu.edu/users/list/',
      update_user: 'https://test.portal.biochemistry.gwu.edu/users/update_user/',
      userdb_tokenauth: 'https://test.portal.biochemistry.gwu.edu/users/token-auth/',
      userdb_tokenverify: 'https://test.portal.biochemistry.gwu.edu/users/token-verify/',
      anon_api_info: [
        {
          token: '627626823549f787c3ec763ff687169206626149',
          public_hostname: 'https://test.portal.biochemistry.gwu.edu'
        }
      ]
    },
    production: {
      userdb: 'https://biocomputeobject.org/users/',
      bcoapi: 'https://biocomputeobject.org/api/',
      bcoapi_accounts_new: 'https://biocomputeobject.org/api/accounts/new/',
      bcoapi_description_permissions: 'https://biocomputeobject.org/api/description/permissions/',
      bcoapi_objects_create: 'https://biocomputeobject.org/api/objects/create/',
      bcoapi_objects_list: 'https://biocomputeobject.org/api/objects/token/',
      bcoapi_objects_read: 'https://biocomputeobject.org/api/objects/read/',
      bcoapi_objects_view: 'https://biocomputeobject.org/api/objects/view/',
      userdb_addapi: 'https://biocomputeobject.org/users/add_api/',
      userdb_removeapi: 'https://biocomputeobject.org/users/remove_api/',
      userdb_users: 'https://biocomputeobject.org/users/list/',
      update_user: 'https://biocomputeobject.org/users/update_user/',
      userdb_tokenauth: 'https://biocomputeobject.org/users/token-auth/',
      userdb_tokenverify: 'https://biocomputeobject.org/users/token-verify/',
      anon_api_info: [
        {
          token: 'b196023f46cdc919d064b0d9f210154d9a7a5b2e',
          public_hostname: 'https://biocomputeobject.org'
        }
      ]
    }
  };
  const versions = {
    portal: '22.01',
    bcodb: '22.001',
    userdb: '22.01'
  };

  /**
  * LOCAL / DEVELOPMENT / BETA SWITCH / TEST
  *  Change hostnames.* to match the deployment environment
  *
  * @example
  * const sending = hostnames.local;
  */
  const sending = hostnames.local;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      TokenVerify(isLoggedIn, setIsLoggedIn, sending);
    }
  }, [isLoggedIn, sending]);

  return (
    <ThemeProvider theme={theme}>
      <FetchContext.Provider value={{ sending, versions, isLoggedIn }}>
        <GlobalStyles />
        {routing}
      </FetchContext.Provider>
    </ThemeProvider>
  );
}

export default App;

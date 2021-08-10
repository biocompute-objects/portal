// src/App.js

import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes  } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

// Create a context to pass the fetch variables.
// Source: https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context

import { createContext } from 'react';

export const FetchContext = createContext();

function App() {

	const routing = useRoutes(routes());

	// ----- HOSTNAMES ----- //

	// Define hostnames here.
	const hostnames = {
		'local': {
			'bcoapi_accounts_new': 'http://127.0.0.1:8000/api/accounts/new/',
			'bcoapi_description_permissions': 'http://127.0.0.1:8000/api/description/permissions/',
			'bcoapi_objects_create': 'http://127.0.0.1:8000/api/objects/create/',
			'bcoapi_objects_list': 'http://127.0.0.1:8000/api/objects/token/',
			'bcoapi_objects_read': 'http://127.0.0.1:8000/api/objects/read/',
			'bcoapi_objects_view': 'http://127.0.0.1:8000/api/objects/view/',
			'userdb_addapi': 'http://127.0.0.1:8080/users/add_api/',
			'userdb_users': 'http://127.0.0.1:8080/users/list/',
			'userdb_tokenauth': 'http://127.0.0.1:8080/users/token-auth/'
		},
		'development': {
			'bcoapi_accounts_new': 'https://dev.portal.aws.biochemistry.gwu.edu/api/accounts/new/',
			'bcoapi_description_permissions': 'https://dev.portal.aws.biochemistry.gwu.edu/api/description/permissions/',
			'bcoapi_objects_create': 'https://dev.portal.aws.biochemistry.gwu.edu/api/objects/create/',
			'bcoapi_objects_list': 'https://dev.portal.aws.biochemistry.gwu.edu/api/objects/token/',
			'bcoapi_objects_read': 'https://dev.portal.aws.biochemistry.gwu.edu/api/objects/read/',
			'bcoapi_objects_view': 'https://dev.portal.aws.biochemistry.gwu.edu/api/objects/view/',
			'userdb_addapi': 'https://dev.portal.aws.biochemistry.gwu.edu/users/add_api/',
			'userdb_users': 'https://dev.portal.aws.biochemistry.gwu.edu/users/list/',
			'userdb_tokenauth': 'https://dev.portal.aws.biochemistry.gwu.edu/users/token-auth/'
		},
		'beta': {
			'bcoapi_accounts_new': 'https://beta.portal.aws.biochemistry.gwu.edu/api/accounts/new/',
			'bcoapi_description_permissions': 'https://beta.portal.aws.biochemistry.gwu.edu/api/description/permissions/',
			'bcoapi_objects_create': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/create/',
			'bcoapi_objects_list': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/token/',
			'bcoapi_objects_read': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/read/',
			'bcoapi_objects_view': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/view/',
			'userdb_addapi': 'https://beta.portal.aws.biochemistry.gwu.edu/users/add_api/',
			'userdb_users': 'https://beta.portal.aws.biochemistry.gwu.edu/users/list/',
			'userdb_tokenauth': 'https://beta.portal.aws.biochemistry.gwu.edu/users/token-auth/'
		},
		'test': {
			'bcoapi_accounts_new': 'https://test.portal.biochemistry.gwu.edu/api/accounts/new/',
			'bcoapi_description_permissions': 'https://test.portal.biochemistry.gwu.edu/api/description/permissions/',
			'bcoapi_objects_create': 'https://test.portal.biochemistry.gwu.edu/api/objects/create/',
			'bcoapi_objects_list': 'https://test.portal.biochemistry.gwu.edu/api/objects/token/',
			'bcoapi_objects_read': 'https://test.portal.biochemistry.gwu.edu/api/objects/read/',
			'bcoapi_objects_view': 'https://test.portal.biochemistry.gwu.edu/api/objects/view/',
			'userdb_addapi': 'https://test.portal.biochemistry.gwu.edu/users/add_api/',
			'userdb_users': 'https://test.portal.biochemistry.gwu.edu/users/list/',
			'userdb_tokenauth': 'https://test.portal.biochemistry.gwu.edu/users/token-auth/'
		},
		'production': {
			'bcoapi_accounts_new': 'https://portal.biochemistry.gwu.edu/api/accounts/new/',
			'bcoapi_description_permissions': 'https://portal.biochemistry.gwu.edu/api/description/permissions/',
			'bcoapi_objects_create': 'https://portal.biochemistry.gwu.edu/api/objects/create/',
			'bcoapi_objects_list': 'https://portal.biochemistry.gwu.edu/api/objects/token/',
			'bcoapi_objects_read': 'https://portal.biochemistry.gwu.edu/api/objects/read/',
			'bcoapi_objects_view': 'https://portal.biochemistry.gwu.edu/api/objects/view/',
			'userdb_addapi': 'https://portal.biochemistry.gwu.edu/users/add_api/',
			'userdb_users': 'https://portal.biochemistry.gwu.edu/users/list/',
			'userdb_tokenauth': 'https://portal.biochemistry.gwu.edu/users/token-auth/'
		}
	};



	// ----- LOCAL / DEVELOPMENT / BETA SWITCH ----- //
	// Change hostnames.* to match the deployment environment
	const sending = hostnames.local
	
	return (
		<ThemeProvider theme={theme}>
			<FetchContext.Provider value={{ sending }}>
				<GlobalStyles />
				{routing}
			</FetchContext.Provider>
		</ThemeProvider>
  );
};

export default App;

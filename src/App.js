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




	// ----- DEVELOPMENT / PRODUCTION SWITCH ----- //

	// Set the switch.
	const production = false;



	// ----- HOSTNAMES ----- //

	// Define hostnames here.
	const hostnames = {
		'development': {
			'bcoapi_accounts_new': 'http://127.0.0.1:8000/api/accounts/new/',
			'bcoapi_description_permissions': 'http://127.0.0.1:8000/api/description/permissions/',
			'bcoapi_objects_create': 'http://127.0.0.1:8000/api/objects/create/',
			'bcoapi_objects_list': 'http://127.0.0.1:8000/api/objects/token/',
			'bcoapi_objects_read': 'http://127.0.0.1:8000/api/objects/read/',
			'bcoapi_objects_view': 'http://127.0.0.1:8000/api/objects/view/',
			'userdb_addapi': 'http://127.0.0.1:8080/users/add_api/',
			'userdb_users': 'http://127.0.0.1:8080/users/list/',
			'userdb_tokenauth': 'http://127.0.0.1:8080/users/token-auth/',
			'userdb_update_user': 'http://127.0.0.1:8080/update_user/'
		},
		'production': {
			'bcoapi_accounts_new': 'https://beta.portal.aws.biochemistry.gwu.edu/api/accounts/new/',
			'bcoapi_description_permissions': 'https://beta.portal.aws.biochemistry.gwu.edu/api/description/permissions/',
			'bcoapi_objects_create': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/create/',
			'bcoapi_objects_list': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/token/',
			'bcoapi_objects_read': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/read/',
			'bcoapi_objects_view': 'https://beta.portal.aws.biochemistry.gwu.edu/api/objects/view/',
			'userdb_addapi': 'https://beta.portal.aws.biochemistry.gwu.edu/users/add_api/',
			'userdb_users': 'https://beta.portal.aws.biochemistry.gwu.edu/users/list/',
			'userdb_tokenauth': 'https://beta.portal.aws.biochemistry.gwu.edu/users/token-auth/'
		}
	};




	// Set what we're sending to the context.
	const sending = production === false ? hostnames.development : hostnames.production
	
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

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
			'bcoapi_description_permissions': 'http://127.0.0.1:8000/api/description/permissions/',
			'bcoapi_objects_create': 'http://127.0.0.1:8000/bco/objects/create/',
			'bcoapi_objects_read': 'http://127.0.0.1:8000/bco/objects/read/',
			'userdb_core_users': 'http://127.0.0.1:8080/core/users/',
			'userdb_tokenauth': 'http://127.0.0.1:8080/token-auth/'
		},
		'production': {
			'bcoapi_description_permissions': 'http://beta.aws.biochemistry.gwu.edu/api/description/permissions/',
			'bcoapi_objects_create': 'http://beta.aws.biochemistry.gwu.edu/bco/objects/create/',
			'bcoapi_objects_read': 'http://beta.aws.biochemistry.gwu.edu/bco/objects/read/',
			'userdb_core_users': 'https://beta.aws.biochemistry.gwu.edu/core/users/',
			'userdb_tokenauth': 'https://beta.portal.aws.biochemistry.gwu.edu/token-auth/'
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

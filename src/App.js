import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes  } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

// Context
// Source: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

// Create the context.
export const LoginContext = React.createContext();

function App() {
	// const fakeAuth = {
	// 	isAuthenticated: false,
	// 	authenticate(cb) {
	// 		this.isAuthenticated = true
	// 		setTimeout(cb, 100)
	// 	},
	// 	signout(cb) {
	// 		this.isAuthenticated = false
	// 		setTimeout(cb, 100  )
	// 	}
	// }

	// Login state
	const isLoggedIn = true;
	const routing = useRoutes(routes(isLoggedIn));

  return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{routing}
		</ThemeProvider>
  );
};

export default App;

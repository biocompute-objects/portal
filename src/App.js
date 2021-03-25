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

	// Login state and routing
	const [isLoggedIn, setIsLoggedIn] = React.useState();
	const user = '';
	const routing = useRoutes(routes(isLoggedIn));

	useEffect(() => {
		console.log(isLoggedIn);
		console.log(localStorage.getItem('token'))
	}, [isLoggedIn])

  // Pass the context with the login variable (deep pass).	
	return (
		<ThemeProvider theme={theme}>
			<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
				<GlobalStyles />
				{routing}
			</LoginContext.Provider>
		</ThemeProvider>
  );
};
export default App;

// src/App.js

import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes  } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

// Source: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

function App() {
	const routing = useRoutes(routes());

  // Pass the context with the login variable (deep pass).	
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{routing}
		</ThemeProvider>
  );
};
export default App;

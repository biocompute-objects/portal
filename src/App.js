import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes, BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

function App() {
	const fakeAuth = {
		isAuthenticated: false,
		authenticate(cb) {
			this.isAuthenticated = true
			setTimeout(cb, 100)
		},
		signout(cb) {
			this.isAuthenticated = false
			setTimeout(cb, 100  )
		}
	}
  const routing = useRoutes(routes(fakeAuth));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;

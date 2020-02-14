import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { green, lightGreen } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
      light: green[300],
      dark: green[900]
    },
    secondary: {
      main: lightGreen.A400
    },
    type: 'light'
  },
  spacing: 10
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

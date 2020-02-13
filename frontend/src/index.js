import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
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
      // main: '#1e90ff'
    },
    type: 'dark'
  },
  spacing: 10
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

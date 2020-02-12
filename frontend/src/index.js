import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange.A400,
      light: orange[300],
      dark: orange[900]
    },
    secondary: {
      main: '#f44336' // Dodge Blue
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

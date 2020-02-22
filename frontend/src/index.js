import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { green, lightGreen } from '@material-ui/core/colors';

// Importing Redux
import { Provider } from 'react-redux';
import Store from './redux/store';

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
  spacing: 10,
  overrides: {
    // Style sheet name ⚛️
    MuiMobileStepper: {
      // Name of the rule
      progress: {
        // Some CSS
        width: '100%'
      }
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={Store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

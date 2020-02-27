import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { green, lightGreen } from '@material-ui/core/colors';
import * as ServiceWorker from './serviceWorker';

// Importing Redux
import { Provider } from 'react-redux';
import Store from './store';

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
  overrides: {
    MuiMobileStepper: {
      progress: {
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

ServiceWorker.register();

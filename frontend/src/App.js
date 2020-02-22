import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CustomRoutes from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Route component={CustomRoutes} />
    </BrowserRouter>
  );
};

export default App;

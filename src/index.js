import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { FavoritesContextProvider } from './store/favorites-context';
import { AuthContextProvider } from './authContext/AuthContext';

ReactDOM.render(
  <AuthContextProvider>
    <FavoritesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
